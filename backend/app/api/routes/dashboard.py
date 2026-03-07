from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.models.project_model import Project
from app.models.anomaly import Anomaly
from app.models.complaint_model import Complaint
from app.models.budget_model import Budget

router = APIRouter()


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    total_projects = db.query(Project).count()
    total_budget = db.query(func.sum(Project.project_budget)).scalar() or 0
    total_utilized = db.query(func.sum(Project.utilized_amount)).scalar() or 0
    total_anomalies = db.query(Anomaly).count()
    total_complaints = db.query(Complaint).count()

    ongoing = db.query(Project).filter(Project.project_status == "Ongoing").count()
    completed = db.query(Project).filter(Project.project_status == "Completed").count()
    delayed = db.query(Project).filter(Project.project_status == "Delayed").count()

    high_risk = db.query(Anomaly).filter(Anomaly.severity == "High").count()

    return {
        "total_projects": total_projects,
        "total_budget": total_budget,
        "total_utilized": total_utilized,
        "utilization_rate": round((total_utilized / max(total_budget, 1)) * 100, 1),
        "total_anomalies": total_anomalies,
        "total_complaints": total_complaints,
        "high_risk_anomalies": high_risk,
        "project_status": {
            "ongoing": ongoing,
            "completed": completed,
            "delayed": delayed,
        },
    }
