from pydantic import BaseModel
from typing import Optional


class ProjectCreate(BaseModel):
    project_name: str
    project_type: str
    project_budget: float
    project_status: str
    department: str = ""
    scheme: str = ""
    vendor: str = ""
    state: str = ""
    district: str = ""


class ProjectResponse(ProjectCreate):
    project_id: int
    utilized_amount: float = 0
    start_date: str = ""
    end_date: str = ""
    anomaly_flag: bool = False

    class Config:
        from_attributes = True