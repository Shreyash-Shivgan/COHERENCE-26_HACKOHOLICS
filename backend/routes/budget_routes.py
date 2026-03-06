from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.budget_service import (
    get_state_budget_summary,
    get_district_budget_summary,
    get_scheme_flow_summary,
)

router = APIRouter(prefix="/budget", tags=["budget"])


@router.get("/state-summary")
def state_summary(db: Session = Depends(get_db)):
    """Budget summary per state with central→state gaps."""
    return get_state_budget_summary(db)


@router.get("/district-summary")
def district_summary(db: Session = Depends(get_db)):
    """Budget summary per district with state→district gaps."""
    return get_district_budget_summary(db)


@router.get("/scheme-flow")
def scheme_flow(db: Session = Depends(get_db)):
    """Scheme-level budget flow and utilization rates."""
    return get_scheme_flow_summary(db)
