from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.core.database import get_db
from app.core.firebase import create_access_token
from app.models.user_model import User
from app.schemas.user_schema import UserLogin, UserRegister, TokenResponse, UserResponse

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _safe_pwd(password: str) -> str:
    """Truncate to 72 bytes — bcrypt 5.x enforces the limit."""
    return password.encode("utf-8")[:72].decode("utf-8", errors="ignore")


@router.post("/register", response_model=TokenResponse)
def register(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    password_bytes = _safe_pwd(data.password)
    hashed_password = pwd_context.hash(password_bytes)

    user = User(
        email=data.email,
        hashed_password=hashed_password,
        full_name=data.full_name,
        role=data.role,
        department=data.department,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    })

    return TokenResponse(
        access_token=token,
        user=UserResponse.model_validate(user),
    )
    
@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    password_bytes = _safe_pwd(data.password)

    if not pwd_context.verify(password_bytes, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    })

    return TokenResponse(
        access_token=token,
        user=UserResponse.model_validate(user),
    )

@router.get("/me", response_model=UserResponse)
def get_me(db: Session = Depends(get_db), current_user: dict = Depends(
    __import__('app.core.security', fromlist=['get_current_user']).get_current_user
)):
    user = db.query(User).filter(User.id == int(current_user["sub"])).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse.model_validate(user)