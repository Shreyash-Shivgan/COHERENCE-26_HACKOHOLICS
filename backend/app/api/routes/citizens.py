from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone
import json

from app.core.database import get_db
from app.models.complaint_model import Complaint
from app.schemas.complaint_schema import ComplaintCreate, ComplaintResponse

router = APIRouter()


@router.post("", response_model=ComplaintResponse)
def submit_complaint(data: ComplaintCreate, db: Session = Depends(get_db)):
    dump_data = data.model_dump()
    photos_json = json.dumps(dump_data.pop("photos", []))

    complaint = Complaint(
        **dump_data,
        photos=photos_json,
        timestamp=datetime.now(timezone.utc).isoformat(),
        review_status="Under Review",
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    response_data = complaint.__dict__.copy()
    response_data["photos"] = json.loads(complaint.photos)
    return response_data


@router.get("", response_model=List[ComplaintResponse])
def list_complaints(db: Session = Depends(get_db)):
    complaints = db.query(Complaint).order_by(Complaint.id.desc()).limit(20).all()
    results = []
    for c in complaints:
        c_dict = c.__dict__.copy()
        try:
            c_dict["photos"] = json.loads(c.photos)
        except Exception:
            c_dict["photos"] = []
        results.append(c_dict)
    return results