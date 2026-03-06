from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from services.aadhaar_service import verify_aadhaar, get_verification_status

router = APIRouter(prefix="/aadhaar", tags=["aadhaar"])


@router.post("/verify")
async def verify_aadhaar_endpoint(
    user_email: str = Form(...),
    aadhaar_number: str = Form(...),
    full_name: str = Form(...),
    aadhaar_image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Verify a citizen's Aadhaar card.
    Upload the Aadhaar card image along with entered details.
    The system will run OCR and compare the extracted text with entered data.
    """
    result = verify_aadhaar(
        db=db,
        user_email=user_email,
        entered_aadhaar=aadhaar_number,
        entered_name=full_name,
        photo_file=aadhaar_image,
    )

    if not result["success"] and result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"])

    return result


@router.get("/status")
def check_verification_status(
    email: str,
    db: Session = Depends(get_db),
):
    """Check if a citizen is Aadhaar-verified by their email."""
    return get_verification_status(db, email)
