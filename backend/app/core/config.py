"""Central configuration for paths, Tesseract binary location, and thresholds."""
import os
import platform

# ─── Upload directory for Aadhaar card images ──────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
AADHAAR_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads", "aadhaar_cards")
os.makedirs(AADHAAR_UPLOAD_DIR, exist_ok=True)

# ─── Tesseract OCR binary path ─────────────────────────────────────
if platform.system() == "Windows":
    TESSERACT_CMD = os.getenv(
        "TESSERACT_CMD",
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    )
else:
    TESSERACT_CMD = os.getenv("TESSERACT_CMD", "tesseract")

# ─── OCR matching thresholds ───────────────────────────────────────
NAME_MATCH_RATIO = 0.75  # minimum word-match ratio for name verification
