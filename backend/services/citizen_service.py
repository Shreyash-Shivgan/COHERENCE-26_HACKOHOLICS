import os
import uuid
import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.citizen_report import CitizenReport
from models.project import Project
from models.anomaly import Anomaly
from config import UPLOAD_DIR, ALLOWED_PHOTO_EXTENSIONS, AnomalyThresholds as T
from utils.notifications import notify_citizens_for_verification


def create_citizen_report(db: Session, project_id: int, citizen_name: str,
                          report_text: str, is_dispute: bool = False,
                          photo_file=None):
    """Create a citizen report with optional photo upload."""
    # Validate project exists
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return None, "Project not found"

    # Handle photo upload
    photo_path = None
    if photo_file:
        ext = os.path.splitext(photo_file.filename)[1].lower()
        if ext not in ALLOWED_PHOTO_EXTENSIONS:
            return None, f"Invalid file type. Allowed: {', '.join(ALLOWED_PHOTO_EXTENSIONS)}"

        unique_name = f"{project_id}_{uuid.uuid4().hex}{ext}"
        save_path = os.path.join(UPLOAD_DIR, unique_name)
        with open(save_path, "wb") as f:
            content = photo_file.file.read()
            f.write(content)
        photo_path = f"uploads/citizen_photos/{unique_name}"

    # Create report
    report = CitizenReport(
        project_id=project_id,
        citizen_name=citizen_name,
        report_text=report_text,
        photo_path=photo_path,
        is_dispute=is_dispute,
        created_at=datetime.datetime.utcnow(),
    )
    db.add(report)

    # Update project complaint count
    project.citizen_complaints = (project.citizen_complaints or 0) + 1
    if is_dispute:
        _process_dispute(db, project)

    db.commit()
    db.refresh(report)
    return report, None


def get_all_reports(db: Session):
    """Get all citizen reports."""
    reports = db.query(CitizenReport).order_by(CitizenReport.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "project_id": r.project_id,
            "citizen_name": r.citizen_name,
            "report_text": r.report_text,
            "photo_path": r.photo_path,
            "is_dispute": r.is_dispute,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in reports
    ]


def get_reports_by_project(db: Session, project_id: int):
    """Get all reports for a specific project."""
    reports = db.query(CitizenReport).filter(
        CitizenReport.project_id == project_id
    ).order_by(CitizenReport.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "project_id": r.project_id,
            "citizen_name": r.citizen_name,
            "report_text": r.report_text,
            "photo_path": r.photo_path,
            "is_dispute": r.is_dispute,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in reports
    ]


def _process_dispute(db: Session, project: Project):
    """When a citizen disputes completion, check if threshold is reached."""
    dispute_count = db.query(func.count(CitizenReport.id)).filter(
        CitizenReport.project_id == project.id,
        CitizenReport.is_dispute == True,
    ).scalar() or 0

    if dispute_count >= T.FALSE_COMPLETION_COMPLAINTS:
        # Flag as false completion anomaly
        existing = db.query(Anomaly).filter(
            Anomaly.project_id == project.id,
            Anomaly.anomaly_type == "Citizen dispute - false completion"
        ).first()
        if not existing:
            anomaly = Anomaly(
                project_id=project.id,
                anomaly_type="Citizen dispute - false completion",
                anomaly_score=0.85,
                description=f"{dispute_count} citizens have disputed the completion of this project",
                created_at=datetime.datetime.utcnow(),
            )
            db.add(anomaly)
            project.completion_verified = False

            # Trigger notification
            notify_citizens_for_verification(
                project.id,
                f"⚠️ Project '{project.project_name}' completion disputed by {dispute_count} citizens. Investigation initiated."
            )
