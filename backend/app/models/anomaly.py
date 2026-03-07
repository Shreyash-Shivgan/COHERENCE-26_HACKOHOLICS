from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base


class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    anomaly_id = Column(String, unique=True, index=True)
    project_id = Column(Integer, index=True)
    project_name = Column(String)
    department = Column(String)
    scheme = Column(String)
    vendor = Column(String)
    project_status = Column(String)
    anomaly_type = Column(String)
    severity = Column(String)
    status = Column(String)
    description = Column(String)
    amount_at_risk = Column(Float, default=0)
    date = Column(String)
    district = Column(String)
    state = Column(String)
