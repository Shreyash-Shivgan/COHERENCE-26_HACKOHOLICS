from sqlalchemy import Column, Integer, String, Float, Boolean
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_name = Column(String, nullable=False)
    project_type = Column(String)
    project_budget = Column(Float)
    project_status = Column(String)
    department = Column(String)
    scheme = Column(String)
    vendor = Column(String)
    state = Column(String, index=True)
    district = Column(String, index=True)
    utilized_amount = Column(Float, default=0)
    start_date = Column(String)
    end_date = Column(String)
    anomaly_flag = Column(Boolean, default=False)