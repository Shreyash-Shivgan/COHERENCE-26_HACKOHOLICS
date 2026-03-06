from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, index=True)
    project_name = Column(String)
    department = Column(String)
    scheme = Column(String)
    vendor = Column(String)
    issue_type = Column(String)
    rating = Column(Integer, default=0)
    description = Column(String)
    photo_count = Column(Integer, default=0)
    reporter_name = Column(String)
    reporter_phone = Column(String, default="")
    timestamp = Column(String)
    review_status = Column(String, default="Under Review")