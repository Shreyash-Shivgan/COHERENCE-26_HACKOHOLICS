from sqlalchemy import Column, Integer, String, Float, Boolean
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_name = Column(String, nullable=False)
    project_type = Column(String)
    project_budget = Column(Float, default=0)
    project_status = Column(String, default="Ongoing")
    department = Column(String, default="")
    scheme = Column(String, default="")
    vendor = Column(String, default="")
    state = Column(String, default="")
    district = Column(String, default="")
    utilized_amount = Column(Float, default=0)
    start_date = Column(String, default="")
    end_date = Column(String, default="")
    anomaly_flag = Column(Boolean, default=False)