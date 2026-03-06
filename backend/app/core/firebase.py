"""
Firebase module — replaced with JWT-based auth for standalone development.
Firebase can be restored by uncommenting the original code and providing firebase_key.json.
"""

from jose import JWTError, jwt
from app.config import SECRET_KEY, ALGORITHM


def verify_token(token: str):
    """Decode a JWT token and return the payload, or None if invalid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def create_access_token(data: dict):
    """Create a JWT access token."""
    from datetime import datetime, timedelta, timezone
    from app.config import ACCESS_TOKEN_EXPIRE_MINUTES

    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)