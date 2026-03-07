from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.anomaly import Anomaly
from app.schemas.anomaly_schema import AnomalyResponse

router = APIRouter()


@router.get("/", response_model=List[AnomalyResponse])
def get_anomalies(db: Session = Depends(get_db)):
    return db.query(Anomaly).all()