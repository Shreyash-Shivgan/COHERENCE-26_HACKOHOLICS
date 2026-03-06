import os
import re
import uuid
import json
import datetime
from sqlalchemy.orm import Session
from models.aadhaar_verification import AadhaarVerification
from config import AADHAAR_UPLOAD_DIR, TESSERACT_CMD

try:
    from PIL import Image
    import pytesseract
    # Configure Tesseract binary path if set
    if TESSERACT_CMD:
        pytesseract.pytesseract.tesseract_cmd = TESSERACT_CMD
except ImportError:
    Image = None
    pytesseract = None


def _normalize(text: str) -> str:
    """Remove extra spaces, lower-case, strip for comparison."""
    return re.sub(r"\s+", " ", text).lower().strip()


def _digits_only(text: str) -> str:
    """Extract only digits from text."""
    return re.sub(r"\D", "", text)


def run_ocr(image_path: str) -> dict:
    """Run Tesseract OCR on an image and return raw text."""
    if Image is None or pytesseract is None:
        return {
            "success": False,
            "error": "OCR libraries (Pillow, pytesseract) not installed. Run: pip install Pillow pytesseract",
            "raw_text": "",
        }

    try:
        img = Image.open(image_path)
        raw_text = pytesseract.image_to_string(img, lang="eng")
    except Exception as e:
        return {
            "success": False,
            "error": f"OCR processing failed: {str(e)}",
            "raw_text": "",
        }

    return {
        "success": True,
        "raw_text": raw_text,
        "error": None,
    }


def _check_aadhaar_in_text(entered_aadhaar: str, ocr_text: str) -> dict:
    """
    REVERSE VERIFICATION: Check if the entered 12-digit Aadhaar number
    appears anywhere in the OCR-extracted text.
    """
    entered_digits = _digits_only(entered_aadhaar)

    # Extract all digits from the OCR text as one long string
    ocr_digits = _digits_only(ocr_text)

    # Check if the 12-digit number appears in the continuous digit stream
    found_in_digits = entered_digits in ocr_digits

    # Also check with the spaced format (XXXX XXXX XXXX) in the raw text
    spaced = f"{entered_digits[:4]} {entered_digits[4:8]} {entered_digits[8:]}"
    dashed = f"{entered_digits[:4]}-{entered_digits[4:8]}-{entered_digits[8:]}"
    found_spaced = spaced in ocr_text or dashed in ocr_text

    found = found_in_digits or found_spaced

    return {
        "entered": entered_digits,
        "found_in_image": found,
        "match": found,
    }


def _check_name_in_text(entered_name: str, ocr_text: str) -> dict:
    """
    REVERSE VERIFICATION: Check if the entered name appears
    anywhere in the OCR-extracted text (case-insensitive).
    """
    normalized_text = _normalize(ocr_text)
    normalized_name = _normalize(entered_name)

    # Strategy 1: Full name appears as-is in the text
    full_match = normalized_name in normalized_text

    # Strategy 2: Check if each word of the name appears in the text
    name_words = normalized_name.split()
    words_found = [w for w in name_words if w in normalized_text]
    word_match_ratio = len(words_found) / max(len(name_words), 1)

    # Consider it a match if full name found OR ≥ 75% of name words found
    found = full_match or word_match_ratio >= 0.75

    return {
        "entered": entered_name,
        "found_in_image": found,
        "match": found,
        "words_found": words_found,
        "words_total": name_words,
        "match_ratio": round(word_match_ratio * 100),
    }


def verify_aadhaar(
    db: Session,
    user_email: str,
    entered_aadhaar: str,
    entered_name: str,
    photo_file,
) -> dict:
    """
    REVERSE VERIFICATION flow:
    1. Save the uploaded Aadhaar card image
    2. Run OCR to extract ALL text from the image
    3. Check if the user-entered Aadhaar number exists in the OCR text
    4. Check if the user-entered name exists in the OCR text
    5. If both found → verified
    """
    # Clean the entered Aadhaar number (remove spaces/dashes)
    entered_aadhaar_clean = re.sub(r"[\s\-]", "", entered_aadhaar)

    if len(entered_aadhaar_clean) != 12 or not entered_aadhaar_clean.isdigit():
        return {
            "success": False,
            "error": "Invalid Aadhaar number. Must be 12 digits.",
            "is_verified": False,
        }

    # Save uploaded image
    photo_path = None
    if photo_file:
        ext = os.path.splitext(photo_file.filename)[1].lower()
        if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
            return {
                "success": False,
                "error": "Invalid image format. Use JPG, PNG, or WEBP.",
                "is_verified": False,
            }

        os.makedirs(AADHAAR_UPLOAD_DIR, exist_ok=True)
        unique_name = f"aadhaar_{uuid.uuid4().hex}{ext}"
        save_path = os.path.join(AADHAAR_UPLOAD_DIR, unique_name)
        with open(save_path, "wb") as f:
            content = photo_file.file.read()
            f.write(content)
        photo_path = f"uploads/aadhaar_cards/{unique_name}"
    else:
        return {
            "success": False,
            "error": "Aadhaar card image is required.",
            "is_verified": False,
        }

    # Run OCR — extract ALL text from the image
    full_image_path = os.path.join(AADHAAR_UPLOAD_DIR, unique_name)
    ocr_result = run_ocr(full_image_path)

    match_details = {}

    if ocr_result["success"]:
        raw_text = ocr_result["raw_text"]

        # REVERSE CHECK: Is the entered Aadhaar number in the image?
        aadhaar_check = _check_aadhaar_in_text(entered_aadhaar_clean, raw_text)
        match_details["aadhaar_number"] = aadhaar_check

        # REVERSE CHECK: Is the entered name in the image?
        name_check = _check_name_in_text(entered_name, raw_text)
        match_details["name"] = name_check

        aadhaar_match = aadhaar_check["match"]
        name_match = name_check["match"]
    else:
        match_details["ocr_error"] = ocr_result.get("error", "Unknown OCR error")
        aadhaar_match = False
        name_match = False

    is_verified = aadhaar_match and name_match

    # Save or update record in DB
    existing = (
        db.query(AadhaarVerification)
        .filter(AadhaarVerification.user_email == user_email)
        .first()
    )

    if existing:
        existing.aadhaar_number = entered_aadhaar_clean
        existing.full_name = entered_name
        existing.aadhaar_image_path = photo_path
        existing.ocr_extracted_text = ocr_result.get("raw_text", "")
        existing.ocr_aadhaar_number = entered_aadhaar_clean if aadhaar_match else None
        existing.ocr_name = entered_name if name_match else None
        existing.is_verified = is_verified
        existing.verification_details = json.dumps(match_details)
        if is_verified:
            existing.verified_at = datetime.datetime.utcnow()
    else:
        record = AadhaarVerification(
            user_email=user_email,
            aadhaar_number=entered_aadhaar_clean,
            full_name=entered_name,
            aadhaar_image_path=photo_path,
            ocr_extracted_text=ocr_result.get("raw_text", ""),
            ocr_aadhaar_number=entered_aadhaar_clean if aadhaar_match else None,
            ocr_name=entered_name if name_match else None,
            is_verified=is_verified,
            verification_details=json.dumps(match_details),
            verified_at=datetime.datetime.utcnow() if is_verified else None,
        )
        db.add(record)

    db.commit()

    return {
        "success": True,
        "is_verified": is_verified,
        "ocr_raw_text": ocr_result.get("raw_text", ""),
        "match_details": match_details,
        "error": ocr_result.get("error"),
    }


def get_verification_status(db: Session, user_email: str) -> dict:
    """Check if a user has been Aadhaar-verified."""
    record = (
        db.query(AadhaarVerification)
        .filter(AadhaarVerification.user_email == user_email)
        .first()
    )

    if not record:
        return {
            "is_verified": False,
            "aadhaar_number": None,
            "full_name": None,
            "verified_at": None,
        }

    return {
        "is_verified": record.is_verified,
        "aadhaar_number": record.aadhaar_number[:4] + " XXXX " + record.aadhaar_number[-4:] if record.aadhaar_number else None,
        "full_name": record.full_name,
        "verified_at": record.verified_at.isoformat() if record.verified_at else None,
    }
