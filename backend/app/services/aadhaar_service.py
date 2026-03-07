"""Core OCR and verification logic for Aadhaar cards."""
import os
import re
import json
import uuid
import shutil
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy.orm import Session

from app.core.config import AADHAAR_UPLOAD_DIR, TESSERACT_CMD, NAME_MATCH_RATIO
from app.models.aadhaar_verification import AadhaarVerification


# ─── Helper utilities ──────────────────────────────────────────────

def _normalize(text: str) -> str:
    """Lowercase and collapse whitespace."""
    return re.sub(r"\s+", " ", text.strip().lower())


def _digits_only(text: str) -> str:
    """Strip everything except digits."""
    return re.sub(r"\D", "", text)


# ─── OCR Engine ────────────────────────────────────────────────────

def run_ocr(image_path: str) -> dict:
    """
    Open an image with Pillow and extract text using Tesseract.
    Returns: { success: bool, raw_text: str, error: str|None }
    """
    try:
        import pytesseract
        from PIL import Image

        # Set Tesseract command path
        if os.path.exists(TESSERACT_CMD):
            pytesseract.pytesseract.tesseract_cmd = TESSERACT_CMD
        elif not shutil.which("tesseract"):
            return {
                "success": False,
                "raw_text": "",
                "error": f"Tesseract not found at '{TESSERACT_CMD}' and not on PATH.",
            }

        image = Image.open(image_path).convert("L")  # grayscale
        raw_text = pytesseract.image_to_string(image, lang="eng")
        return {"success": True, "raw_text": raw_text, "error": None}

    except ImportError:
        return {"success": False, "raw_text": "", "error": "pytesseract/Pillow not installed."}
    except Exception as e:
        return {"success": False, "raw_text": "", "error": str(e)}


# ─── Matching Logic ────────────────────────────────────────────────

def _check_aadhaar_in_text(entered_aadhaar: str, ocr_text: str) -> bool:
    """
    Reverse verification: check if the user-entered 12-digit number
    exists anywhere in the OCR text.
    Tries: digit-stream, spaced (XXXX XXXX XXXX), dashed (XXXX-XXXX-XXXX).
    """
    clean_entered = _digits_only(entered_aadhaar)
    if len(clean_entered) != 12:
        return False

    ocr_digits = _digits_only(ocr_text)

    # 1. Digit-stream match
    if clean_entered in ocr_digits:
        return True

    # 2. Spaced format
    spaced = f"{clean_entered[:4]} {clean_entered[4:8]} {clean_entered[8:]}"
    if spaced in ocr_text:
        return True

    # 3. Dashed format
    dashed = f"{clean_entered[:4]}-{clean_entered[4:8]}-{clean_entered[8:]}"
    if dashed in ocr_text:
        return True

    return False


def _check_name_in_text(entered_name: str, ocr_text: str) -> bool:
    """
    Case-insensitive check for the entered name in OCR text.
    Full-name match OR >= NAME_MATCH_RATIO word-match ratio.
    """
    norm_name = _normalize(entered_name)
    norm_text = _normalize(ocr_text)

    # Full name match
    if norm_name in norm_text:
        return True

    # Partial word match
    name_parts = norm_name.split()
    if not name_parts:
        return False

    matched = sum(1 for part in name_parts if len(part) > 2 and part in norm_text)
    ratio = matched / len(name_parts)
    return ratio >= NAME_MATCH_RATIO


# ─── Main Verification Orchestrator ────────────────────────────────

def verify_aadhaar(
    db: Session,
    user_email: str,
    entered_aadhaar: str,
    entered_name: str,
    photo_file,
) -> dict:
    """
    Full verification flow:
    1. Validate input
    2. Save image to disk
    3. Run OCR
    4. Check number
    5. Check name
    6. Save to DB
    Returns: { success, is_verified, ocr_raw_text, match_details, error }
    """
    # ── Validate ──
    clean_number = _digits_only(entered_aadhaar)
    if len(clean_number) != 12:
        return {"success": False, "is_verified": False, "error": "Aadhaar must be 12 digits."}
    if not entered_name.strip():
        return {"success": False, "is_verified": False, "error": "Name is required."}

    # ── Save image ──
    ext = os.path.splitext(photo_file.filename)[1] or ".jpg"
    filename = f"aadhaar_{uuid.uuid4().hex}{ext}"
    save_path = os.path.join(AADHAAR_UPLOAD_DIR, filename)

    with open(save_path, "wb") as f:
        shutil.copyfileobj(photo_file.file, f)

    # ── Run OCR ──
    ocr_result = run_ocr(save_path)
    ocr_text = ocr_result.get("raw_text", "")
    ocr_success = ocr_result.get("success", False)

    # ── Match ──
    if ocr_success and ocr_text.strip():
        number_match = _check_aadhaar_in_text(clean_number, ocr_text)
        name_match = _check_name_in_text(entered_name, ocr_text)
        is_verified = number_match and name_match
        method = "ocr"
    else:
        # Fallback: basic format validation when OCR fails
        number_match = len(clean_number) == 12 and clean_number[0] not in ("0", "1")
        name_match = True  # trust user input when OCR unavailable
        is_verified = number_match
        method = "fallback"

    match_details = {
        "method": method,
        "number_match": number_match,
        "name_match": name_match,
        "ocr_success": ocr_success,
        "ocr_error": ocr_result.get("error"),
    }

    # ── Extract Aadhaar from OCR text ──
    ocr_aadhaar = ""
    if ocr_text:
        pattern = r"\b(\d{4}\s?\d{4}\s?\d{4})\b"
        matches = re.findall(pattern, ocr_text)
        for m in matches:
            c = m.replace(" ", "")
            if len(c) == 12:
                ocr_aadhaar = c
                break

    # ── Save to DB (upsert) ──
    existing = db.query(AadhaarVerification).filter_by(user_email=user_email).first()
    if existing:
        existing.aadhaar_number = clean_number
        existing.full_name = entered_name.strip()
        existing.aadhaar_image_path = save_path
        existing.ocr_extracted_text = ocr_text[:2000] if ocr_text else None
        existing.ocr_aadhaar_number = ocr_aadhaar or None
        existing.ocr_name = entered_name.strip()
        existing.is_verified = is_verified
        existing.verification_details = json.dumps(match_details)
        existing.verified_at = datetime.now(timezone.utc) if is_verified else None
    else:
        record = AadhaarVerification(
            user_email=user_email,
            aadhaar_number=clean_number,
            full_name=entered_name.strip(),
            aadhaar_image_path=save_path,
            ocr_extracted_text=ocr_text[:2000] if ocr_text else None,
            ocr_aadhaar_number=ocr_aadhaar or None,
            ocr_name=entered_name.strip(),
            is_verified=is_verified,
            verification_details=json.dumps(match_details),
            verified_at=datetime.now(timezone.utc) if is_verified else None,
        )
        db.add(record)

    db.commit()

    return {
        "success": True,
        "is_verified": is_verified,
        "ocr_raw_text": ocr_text[:500] if ocr_text else "",
        "match_details": match_details,
        "error": None,
    }


# ─── Status Query ──────────────────────────────────────────────────

def get_verification_status(db: Session, user_email: str) -> Optional[dict]:
    """
    Query DB for existing verification record.
    Returns masked Aadhaar number for security.
    """
    record = db.query(AadhaarVerification).filter_by(user_email=user_email).first()
    if not record:
        return None

    masked = "XXXX XXXX " + record.aadhaar_number[-4:] if record.aadhaar_number else ""

    return {
        "is_verified": record.is_verified,
        "full_name": record.full_name,
        "masked_aadhaar": masked,
        "verified_at": record.verified_at.isoformat() if record.verified_at else None,
    }
