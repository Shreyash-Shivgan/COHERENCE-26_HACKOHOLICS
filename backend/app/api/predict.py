from fastapi import APIRouter
from app.ml.prediction_model import predict

router = APIRouter(tags=["Prediction"])


@router.post("/")
async def make_prediction(data: list[float]):
    result = predict(data)
    return {"prediction": result}