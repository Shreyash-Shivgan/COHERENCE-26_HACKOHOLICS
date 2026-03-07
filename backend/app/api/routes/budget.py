from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from app.core.database import get_db
from app.models.budget_model import Budget
from app.schemas.budget_schema import BudgetCreate, BudgetResponse

router = APIRouter()


@router.get("/", response_model=List[BudgetResponse])
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


@router.post("/create", response_model=BudgetResponse)
def create_budget(data: BudgetCreate, db: Session = Depends(get_db)):
    budget = Budget(**data.model_dump())
    db.add(budget)
    db.commit()
    db.refresh(budget)
    return budget