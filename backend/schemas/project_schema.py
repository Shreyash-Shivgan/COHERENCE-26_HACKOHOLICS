from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    project_name: str
    scheme_id: int
    state_id: int
    district_id: int
    vendor_id: int
    central_allocated_funds: float
    state_received_funds: float
    district_received_funds: float
    project_budget: float
    spent_amount: float
    project_start_date: Optional[str] = None
    expected_completion: Optional[str] = None
    project_status: str = "Planned"

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    fund_utilization_rate: float
    citizen_rating: float
    citizen_complaints: int
    created_at: datetime

    class Config:
        from_attributes = True
