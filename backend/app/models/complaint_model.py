from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Complaint(Base):

    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(Integer)

    citizen_name = Column(String)

    complaint_text = Column(String)