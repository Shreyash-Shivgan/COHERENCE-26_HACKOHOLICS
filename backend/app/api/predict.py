from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/predict", tags=["Prediction"])

_predict_fn = None
_ml_available = False


def _load_predict():
    global _predict_fn, _ml_available
    if _predict_fn is not None:
        return
    try:
        from app.ml.prediction_model import predict
        _predict_fn = predict
        _ml_available = True
    except ImportError:
        _ml_available = False


@router.post("/")
async def make_prediction(data: list[float]):
    _load_predict()
    if not _ml_available:
        raise HTTPException(
            status_code=503,
            detail="ML dependencies (numpy, scikit-learn) are not installed. "
                   "Install with: pip install numpy pandas scikit-learn joblib shap",
        )
    result = _predict_fn(data)
    return {"prediction": result}