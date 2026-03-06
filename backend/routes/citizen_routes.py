from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from services.citizen_service import create_citizen_report, get_all_reports, get_reports_by_project
from typing import Optional

router = APIRouter(prefix="/citizen", tags=["citizen"])


@router.post("/report")
async def submit_report(
    project_id: int = Form(...),
    citizen_name: str = Form(...),
    report_text: str = Form(...),
    is_dispute: bool = Form(False),
    photo_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    """Submit a citizen report with optional photo evidence."""
    report, error = create_citizen_report(
        db=db,
        project_id=project_id,
        citizen_name=citizen_name,
        report_text=report_text,
        is_dispute=is_dispute,
        photo_file=photo_file,
    )
    if error:
        raise HTTPException(status_code=400, detail=error)

    return {
        "message": "Report submitted successfully",
        "report_id": report.id,
        "photo_path": report.photo_path,
    }


@router.get("/reports")
def list_reports(project_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Get all citizen reports, optionally filtered by project_id."""
    if project_id is not None:
        return get_reports_by_project(db, project_id)
    return get_all_reports(db)
