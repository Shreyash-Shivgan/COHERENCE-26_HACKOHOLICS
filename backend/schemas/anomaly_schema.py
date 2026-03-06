from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AnomalyBase(BaseModel):
    project_id: int
    anomaly_type: str
    anomaly_score: float
    description: str


class AnomalyCreate(AnomalyBase):
    pass


class Anomaly(AnomalyBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
