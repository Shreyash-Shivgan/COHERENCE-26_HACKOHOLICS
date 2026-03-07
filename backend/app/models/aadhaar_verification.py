"""SQLAlchemy model — defines the aadhaar_verifications database table."""
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class AadhaarVerification(Base):
    __tablename__ = "aadhaar_verifications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_email = Column(String(255), unique=True, index=True, nullable=False)
    aadhaar_number = Column(String(12), nullable=False)
    full_name = Column(String(255), nullable=False)
    aadhaar_image_path = Column(String(512), nullable=True)
    ocr_extracted_text = Column(Text, nullable=True)
    ocr_aadhaar_number = Column(String(20), nullable=True)
    ocr_name = Column(String(255), nullable=True)
    is_verified = Column(Boolean, default=False)
    verification_details = Column(Text, nullable=True)  # JSON string
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
