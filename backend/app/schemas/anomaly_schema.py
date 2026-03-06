from pydantic import BaseModel
from typing import Optional


class AnomalyResponse(BaseModel):
    id: int
    anomaly_id: str
    project_id: int
    project_name: str
    department: str
    scheme: str
    vendor: str
    project_status: str
    anomaly_type: str
    severity: str
    status: str
    description: str
    amount_at_risk: float
    date: str
    district: str
    state: str

    class Config:
        from_attributes = True
