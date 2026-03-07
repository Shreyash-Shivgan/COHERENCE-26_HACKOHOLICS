from pydantic import BaseModel
from typing import Optional


class BudgetCreate(BaseModel):
    ministry: str = ""
    state: str = ""
    district: str = ""
    allocated_amount: float = 0
    spent_amount: float = 0
    year: int = 2024


class BudgetResponse(BudgetCreate):
    id: int

    class Config:
        from_attributes = True
