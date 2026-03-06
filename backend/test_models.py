import os
import joblib

MODEL_DIR = r"c:\Users\GauravD\Downloads\COHERENCE-26_HACKOHOLICS-feature-auth\COHERENCE-26_HACKOHOLICS-feature-auth\backend\app\ml\model"

models = [
    "feature_scaler.pkl",
    "model_autoencoder.pkl",
    "model_isolation_forest.pkl",
    "model_random_forest.pkl",
    "model_xgboost.pkl"
]

for model_name in models:
    path = os.path.join(MODEL_DIR, model_name)
    print(f"Loading {model_name}...")
    try:
        model = joblib.load(path)
        print(f"Successfully loaded {model_name}")
    except Exception as e:
        print(f"Failed to load {model_name}: {e}")
