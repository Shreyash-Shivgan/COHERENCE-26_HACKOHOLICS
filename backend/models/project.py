from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    scheme_id = Column(Integer, ForeignKey("schemes.id"))
    state_id = Column(Integer, ForeignKey("states.id"))
    district_id = Column(Integer, ForeignKey("districts.id"))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))

    project_name = Column(String, index=True)
    central_allocated_funds = Column(Float)
    state_received_funds = Column(Float)
    district_received_funds = Column(Float)
    project_budget = Column(Float)
    spent_amount = Column(Float)
    fund_utilization_rate = Column(Float)

    project_start_date = Column(String)  # or DateTime
    expected_completion = Column(String)
    actual_completion = Column(String)

    project_status = Column(String, default="Planned")
    completion_verified = Column(Boolean, default=False)

    citizen_rating = Column(Float, default=0.0)
    citizen_complaints = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scheme = relationship("Scheme", back_populates="projects")
    state = relationship("State", back_populates="projects")
    district = relationship("District", back_populates="projects")
    vendor = relationship("Vendor", back_populates="projects")
    reports = relationship("CitizenReport", back_populates="project")
    anomalies = relationship("Anomaly", back_populates="project")
