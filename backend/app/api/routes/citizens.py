from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone

from app.core.database import get_db
from app.models.complaint_model import Complaint
from app.schemas.complaint_schema import ComplaintCreate, ComplaintResponse

router = APIRouter()


@router.post("/", response_model=ComplaintResponse)
def submit_complaint(data: ComplaintCreate, db: Session = Depends(get_db)):
    complaint = Complaint(
        **data.model_dump(),
        timestamp=datetime.now(timezone.utc).isoformat(),
        review_status="Under Review",
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint


@router.get("/", response_model=List[ComplaintResponse])
def list_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).order_by(Complaint.id.desc()).all()