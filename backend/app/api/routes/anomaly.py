from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from app.core.database import get_db
from app.models.anomaly import Anomaly
from app.schemas.anomaly_schema import AnomalyResponse

router = APIRouter()


@router.get("/", response_model=List[AnomalyResponse])
def list_anomalies(
    state: str = Query("Maharashtra"),
    district: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    scheme: Optional[str] = Query(None),
    vendor: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Anomaly).filter(Anomaly.state == state)
    if district:
        query = query.filter(Anomaly.district == district)
    if department:
        query = query.filter(Anomaly.department == department)
    if scheme:
        query = query.filter(Anomaly.scheme == scheme)
    if vendor:
        query = query.filter(Anomaly.vendor == vendor)
    if severity:
        query = query.filter(Anomaly.severity == severity)
    if status:
        query = query.filter(Anomaly.status == status)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Anomaly.project_name.ilike(search_term)) |
            (Anomaly.anomaly_type.ilike(search_term)) |
            (Anomaly.vendor.ilike(search_term)) |
            (Anomaly.anomaly_id.ilike(search_term))
        )

    return query.all()