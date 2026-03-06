from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

class Budget(Base):

    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)

    ministry = Column(String)
    state = Column(String)
    district = Column(String)

    allocated_amount = Column(Float)
    spent_amount = Column(Float)

    year = Column(Integer)