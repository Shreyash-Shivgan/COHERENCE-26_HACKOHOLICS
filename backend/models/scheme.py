from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    ministry = Column(String)
    scheme_name = Column(String, index=True)

    projects = relationship("Project", back_populates="scheme")
