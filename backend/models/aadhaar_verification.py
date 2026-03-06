from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from database import Base
import datetime


class AadhaarVerification(Base):
    __tablename__ = "aadhaar_verifications"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, unique=True, index=True, nullable=False)
    aadhaar_number = Column(String(12), nullable=False)  # User-entered
    full_name = Column(String, nullable=False)            # User-entered
    aadhaar_image_path = Column(String)
    ocr_extracted_text = Column(Text)        # Full raw OCR text
    ocr_aadhaar_number = Column(String)      # Parsed from OCR
    ocr_name = Column(String)               # Parsed from OCR
    is_verified = Column(Boolean, default=False)
    verification_details = Column(Text)      # JSON string with match details
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
