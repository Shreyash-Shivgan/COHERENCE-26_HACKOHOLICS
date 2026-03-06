from sqlalchemy.orm import Session
from typing import Optional
from app.models.budget_model import Budget


def create_budget(db: Session, data: dict):
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


def get_budgets(db: Session, state: Optional[str] = None, district: Optional[str] = None):
    query = db.query(Budget)
    if state:
        query = query.filter(Budget.state == state)
    if district:
        query = query.filter(Budget.district == district)
    return query.all()