from fastapi import APIRouter

router = APIRouter()

@router.get("/budget-spike")
def detect_budget_spike():
    return {"message": "Budget spike detection working"}

@router.get("/fraud-risk")
def detect_fraud_risk():
    return {"message": "Fraud risk detection working"}