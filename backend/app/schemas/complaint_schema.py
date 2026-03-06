from pydantic import BaseModel
from typing import Optional, List


class ComplaintCreate(BaseModel):
    project_id: int
    project_name: str = ""
    department: str = ""
    scheme: str = ""
    vendor: str = ""
    issue_type: str
    rating: int = 0
    description: str
    photo_count: int = 0
    photos: List[str] = []  # base64 data URIs
    reporter_name: str
    reporter_phone: str = ""


class ComplaintResponse(BaseModel):
    id: int
    project_id: int
    project_name: str
    department: str
    scheme: str
    vendor: str
    issue_type: str
    rating: int
    description: str
    photo_count: int
    photos: List[str] = []
    reporter_name: str
    reporter_phone: str
    timestamp: str
    review_status: str

    class Config:
        from_attributes = True
