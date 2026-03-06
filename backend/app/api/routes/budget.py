from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.models.budget_model import Budget

router = APIRouter()


@router.get("/")
def get_budgets(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    year: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Budget)
    if state:
        query = query.filter(Budget.state == state)
    if district:
        query = query.filter(Budget.district == district)
    if year:
        query = query.filter(Budget.year == year)
    return query.all()


@router.post("/create")
def create_budget(data: dict, db: Session = Depends(get_db)):
    budget = Budget(
        ministry=data.get("ministry", ""),
        state=data.get("state", ""),
        district=data.get("district", ""),
        allocated_amount=data.get("allocated_amount", 0),
        spent_amount=data.get("spent_amount", 0),
        year=data.get("year", 2024),
    )
    db.add(budget)
    db.commit()
    db.refresh(budget)
    return {"id": budget.id, "data": data}