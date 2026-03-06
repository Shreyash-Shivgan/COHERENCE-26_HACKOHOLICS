from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default="citizen")  # citizen | admin
    department = Column(String, default="")

    # Admin profile fields
    profile_completed = Column(Boolean, default=False)
    phone = Column(String, default="")
    designation = Column(String, default="")
    officer_id = Column(String, default="")
    state = Column(String, default="")
    district = Column(String, default="")
