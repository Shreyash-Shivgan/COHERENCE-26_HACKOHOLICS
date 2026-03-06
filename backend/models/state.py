from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class State(Base):
    __tablename__ = "states"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    districts = relationship("District", back_populates="state")
    projects = relationship("Project", back_populates="state")
