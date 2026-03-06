from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from services.vendor_service import get_all_vendors, get_vendor_by_id, get_high_risk_vendors

router = APIRouter(prefix="/vendors", tags=["vendors"])


@router.get("/")
def list_vendors(db: Session = Depends(get_db)):
    """Get all vendors with project counts."""
    return get_all_vendors(db)


@router.get("/high-risk")
def list_high_risk_vendors(db: Session = Depends(get_db)):
    """Get vendors with risk score above threshold."""
    return get_high_risk_vendors(db)


@router.get("/{vendor_id}")
def get_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Get a single vendor with their projects and anomaly info."""
    result = get_vendor_by_id(db, vendor_id)
    if not result:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return result
