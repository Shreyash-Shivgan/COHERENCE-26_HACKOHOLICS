import os

# --- Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads", "citizen_photos")
AADHAAR_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads", "aadhaar_cards")
DB_PATH = os.path.join(BASE_DIR, "budget_intelligence.db")

# Ensure upload directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(AADHAAR_UPLOAD_DIR, exist_ok=True)

# --- Tesseract OCR ---
# Set this to the path of your Tesseract executable if not in PATH
TESSERACT_CMD = os.getenv("TESSERACT_CMD", r"C:\Program Files\Tesseract-OCR\tesseract.exe")

# --- Database ---
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

# --- Security ---
SECRET_KEY = os.getenv("SECRET_KEY", "budget-intelligence-dev-key-change-in-production")
ALLOWED_PHOTO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_PHOTO_SIZE_MB = 5

# --- Anomaly Detection Thresholds ---
class AnomalyThresholds:
    # Financial
    UNDERUTILIZATION_RATE = 0.30        # below 30% utilization is suspicious
    OVERSPENDING_RATE = 1.10            # above 110% of budget is overspending
    CENTRAL_STATE_LEAKAGE_PCT = 0.10    # >10% gap between central and state
    STATE_DISTRICT_LEAKAGE_PCT = 0.10   # >10% gap between state and district
    DISTRICT_PROJECT_LEAKAGE_PCT = 0.15 # >15% gap between district and project

    # Project execution
    DELAY_DAYS_THRESHOLD = 180          # delays over 180 days flagged
    FALSE_COMPLETION_COMPLAINTS = 3     # if >=3 complaints on "Completed" project

    # Vendor
    VENDOR_MONOPOLY_PCT = 0.60          # vendor has >60% projects in a district
    HIGH_RISK_VENDOR_SCORE = 0.60       # vendor risk_score threshold

    # Citizen
    LOW_RATING_THRESHOLD = 2.0          # rating below 2 on completed project
    COMPLAINT_SPIKE_THRESHOLD = 5       # >=5 complaints on a single project
