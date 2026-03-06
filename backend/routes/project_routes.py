from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models.project import Project
from models.anomaly import Anomaly
from models.state import State
from models.vendor import Vendor
import schemas.project_schema as project_schema
from ml.predictor import get_risk_assessment
from utils.notifications import notify_citizens_for_verification
from typing import List, Optional

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/dashboard-stats")
def dashboard_stats(db: Session = Depends(get_db)):
    """Top-level dashboard metrics aggregated across all projects."""
    total_projects = db.query(func.count(Project.id)).scalar() or 0
    total_budget = db.query(func.sum(Project.project_budget)).scalar() or 0
    total_spent = db.query(func.sum(Project.spent_amount)).scalar() or 0
    total_central = db.query(func.sum(Project.central_allocated_funds)).scalar() or 0
    total_state = db.query(func.sum(Project.state_received_funds)).scalar() or 0

    completed = db.query(func.count(Project.id)).filter(
        Project.project_status == "Completed"
    ).scalar() or 0
    in_progress = db.query(func.count(Project.id)).filter(
        Project.project_status == "In Progress"
    ).scalar() or 0
    delayed = db.query(func.count(Project.id)).filter(
        Project.project_status == "Delayed"
    ).scalar() or 0

    total_anomalies = db.query(func.count(Anomaly.id)).scalar() or 0
    high_risk_anomalies = db.query(func.count(Anomaly.id)).filter(
        Anomaly.anomaly_score > 0.6
    ).scalar() or 0
    total_complaints = db.query(func.sum(Project.citizen_complaints)).scalar() or 0

    utilization = (total_spent / total_budget * 100) if total_budget > 0 else 0
    leakage = total_central - total_state

    return {
        "total_projects": total_projects,
        "total_budget": total_budget,
        "total_spent": total_spent,
        "total_central_allocated": total_central,
        "total_state_received": total_state,
        "overall_utilization_pct": round(utilization, 2),
        "total_leakage": leakage,
        "completed_projects": completed,
        "in_progress_projects": in_progress,
        "delayed_projects": delayed,
        "total_anomalies": total_anomalies,
        "high_risk_anomalies": high_risk_anomalies,
        "total_citizen_complaints": total_complaints or 0,
    }


@router.get("/", response_model=List[project_schema.Project])
def get_projects(
    state_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Get all projects with optional filtering by state and status."""
    query = db.query(Project)
    if state_id is not None:
        query = query.filter(Project.state_id == state_id)
    if status is not None:
        query = query.filter(Project.project_status == status)
    return query.all()


@router.get("/{project_id}", response_model=project_schema.Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a single project by ID."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=project_schema.Project)
def create_project(project: project_schema.ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project with auto-computed utilization rate."""
    db_project = Project(**project.model_dump())

    # Auto-compute utilization rate
    if db_project.project_budget and db_project.project_budget > 0:
        db_project.fund_utilization_rate = db_project.spent_amount / db_project.project_budget
    else:
        db_project.fund_utilization_rate = 0

    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.put("/{project_id}/status")
def update_project_status(
    project_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    """Update project status.
    When a vendor marks a project as "Completed", triggers citizen notification.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    old_status = project.project_status
    project.project_status = status

    # If vendor marks completion, notify citizens for verification
    if status == "Completed" and old_status != "Completed":
        notify_citizens_for_verification(
            project.id,
            f"Project '{project.project_name}' has been marked as completed. "
            f"Please verify and report if the work is incomplete or fraudulent."
        )

    db.commit()
    db.refresh(project)
    return {
        "message": f"Project status updated from '{old_status}' to '{status}'",
        "project_id": project.id,
        "project_name": project.project_name,
        "new_status": status,
        "notification_sent": status == "Completed" and old_status != "Completed",
    }


@router.get("/{project_id}/risk")
def get_project_risk(project_id: int, db: Session = Depends(get_db)):
    """Get ML-powered risk assessment for a project."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return get_risk_assessment(project)
