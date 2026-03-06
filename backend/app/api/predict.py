# from fastapi import APIRouter
# from app.ml.prediction_model import predict

# router = APIRouter(prefix="/predict", tags=["Prediction"])

# @router.post("/")
# def make_prediction(data: list):
#     result = predict(data)
#     return result

from fastapi import APIRouter
from app.ml.prediction_model import predict

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def make_prediction(data: list[float]):
    result = predict(data)
    return {"prediction": result}