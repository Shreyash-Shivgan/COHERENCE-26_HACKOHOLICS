from pydantic import BaseModel
from typing import List, Optional


class ComplaintCreate(BaseModel):
    project_id: int
    project_name: str
    department: str = ""
    scheme: str = ""
    vendor: str = ""
    issue_type: str = ""
    rating: int = 0
    description: str = ""
    photo_count: int = 0
    photos: List[str] = []
    reporter_name: str = ""
    reporter_phone: str = ""


class ComplaintResponse(ComplaintCreate):
    id: int
    timestamp: str = ""
    review_status: str = "Under Review"

    class Config:
        from_attributes = True
