from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VendorBase(BaseModel):
    vendor_name: str
    registration_id: str
    contact_email: Optional[str] = None

class VendorCreate(VendorBase):
    pass

class Vendor(VendorBase):
    id: int
    risk_score: float

    class Config:
        from_attributes = True

class CitizenReportBase(BaseModel):
    project_id: int
    citizen_name: str
    report_text: str
    is_dispute: bool = False

class CitizenReportCreate(CitizenReportBase):
    pass

class CitizenReport(CitizenReportBase):
    id: int
    photo_path: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
