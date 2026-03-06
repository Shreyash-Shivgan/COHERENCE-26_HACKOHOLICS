# from fastapi import APIRouter, Depends
# from app.core.security import get_current_user

# router = APIRouter()

# @router.get("/")
# def get_budget_data(user=Depends(get_current_user)):
#     return {
#         "message": "Budget data fetched",
#         "user": user
#     }

from fastapi import APIRouter

router = APIRouter()

@router.get("/flow")
def get_budget_flow():
    return {"message": "Budget flow working"}