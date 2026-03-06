from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from database import Base

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    vendor_name = Column(String, index=True)
    registration_id = Column(String, unique=True, index=True)
    contact_email = Column(String)
    risk_score = Column(Float, default=0.0)

    projects = relationship("Project", back_populates="vendor")
