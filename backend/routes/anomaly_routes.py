from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.anomaly import Anomaly
from services.anomaly_service import run_anomaly_scan, get_state_hotspots

router = APIRouter(prefix="/anomalies", tags=["anomalies"])


@router.get("/")
def get_anomalies(db: Session = Depends(get_db)):
    """Get all detected anomalies."""
    anomalies = db.query(Anomaly).order_by(Anomaly.anomaly_score.desc()).all()
    return [
        {
            "id": a.id,
            "project_id": a.project_id,
            "anomaly_type": a.anomaly_type,
            "anomaly_score": a.anomaly_score,
            "description": a.description,
            "created_at": a.created_at.isoformat() if a.created_at else None,
        }
        for a in anomalies
    ]


@router.get("/high-risk")
def get_high_risk(db: Session = Depends(get_db)):
    """Get anomalies with score > 0.6."""
    anomalies = db.query(Anomaly).filter(
        Anomaly.anomaly_score > 0.6
    ).order_by(Anomaly.anomaly_score.desc()).all()
    return [
        {
            "id": a.id,
            "project_id": a.project_id,
            "anomaly_type": a.anomaly_type,
            "anomaly_score": a.anomaly_score,
            "description": a.description,
            "created_at": a.created_at.isoformat() if a.created_at else None,
        }
        for a in anomalies
    ]


@router.get("/state-hotspots")
def state_hotspots(db: Session = Depends(get_db)):
    """Aggregate anomalies by state to identify corruption hotspots."""
    return get_state_hotspots(db)


@router.post("/scan")
def trigger_anomaly_scan(db: Session = Depends(get_db)):
    """Run a full anomaly detection scan across all projects."""
    result = run_anomaly_scan(db)
    return {
        "message": "Anomaly scan completed",
        **result,
    }
