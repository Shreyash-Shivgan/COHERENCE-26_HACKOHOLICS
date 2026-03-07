from sqlalchemy.orm import Session
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
    return budget