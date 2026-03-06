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
    utilized_amount: float = 0
    start_date: str = ""
    end_date: str = ""
    anomaly_flag: bool = False


class ProjectResponse(BaseModel):
    project_id: int
    project_name: str
    project_type: Optional[str] = None
    project_budget: float
    project_status: str
    department: Optional[str] = None
    scheme: Optional[str] = None
    vendor: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    utilized_amount: float = 0
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    anomaly_flag: bool = False

    class Config:
        from_attributes = True