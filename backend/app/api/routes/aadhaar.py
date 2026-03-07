"""FastAPI router — exposes Aadhaar verification HTTP endpoints."""
from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.aadhaar_service import verify_aadhaar, get_verification_status

router = APIRouter()


@router.post("/verify")
async def verify(
    user_email: str = Form(...),
    aadhaar_number: str = Form(...),
    full_name: str = Form(...),
    aadhaar_image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Accepts multipart form with user_email, aadhaar_number, full_name,
    and aadhaar_image (the card photo). Runs OCR verification flow.
    """
    result = verify_aadhaar(
        db=db,
        user_email=user_email,
        entered_aadhaar=aadhaar_number,
        entered_name=full_name,
        photo_file=aadhaar_image,
    )
    return result


@router.get("/status")
async def status(email: str, db: Session = Depends(get_db)):
    """Returns verification status for a given email."""
    record = get_verification_status(db, email)
    if record is None:
        return {"is_verified": False, "message": "No verification record found."}
    return record
