# import pickle
# import os
# import numpy as np

# BASE_DIR = os.path.dirname(__file__)

# # Load scaler
# scaler = pickle.load(open(os.path.join(BASE_DIR, "model/feature_scaler.pkl"), "rb"))

# # Load models
# rf_model = pickle.load(open(os.path.join(BASE_DIR, "model/model_random_forest.pkl"), "rb"))
# xgb_model = pickle.load(open(os.path.join(BASE_DIR, "model/model_xgboost.pkl"), "rb"))
# iso_model = pickle.load(open(os.path.join(BASE_DIR, "model/model_isolation_forest.pkl"), "rb"))


# def predict(data):
#     data = np.array(data).reshape(1, -1)

#     scaled = scaler.transform(data)

#     rf_pred = rf_model.predict(scaled)[0]
#     xgb_pred = xgb_model.predict(scaled)[0]
#     iso_pred = iso_model.predict(scaled)[0]

#     return {
#         "random_forest": int(rf_pred),
#         "xgboost": int(xgb_pred),
#         "isolation_forest": int(iso_pred)
#     }

# import pickle
# import os
# import numpy as np

# BASE_DIR = os.path.dirname(__file__)
# MODEL_DIR = os.path.join(BASE_DIR, "model")

# import joblib

# def load_model(filename):
#     path = os.path.join(MODEL_DIR, filename)
#     return joblib.load(path)

# # Load scaler
# scaler = load_model("feature_scaler.pkl")

# # Load models
# rf_model = load_model("model_random_forest.pkl")
# xgb_model = load_model("model_xgboost.pkl")
# iso_model = load_model("model_isolation_forest.pkl")


# def predict(data):
#     data = np.array(data).reshape(1, -1)

#     # scale features
#     scaled = scaler.transform(data)

#     rf_pred = rf_model.predict(scaled)[0]
#     xgb_pred = xgb_model.predict(scaled)[0]
#     iso_pred = iso_model.predict(scaled)[0]

#     return {
#     "random_forest_prediction": int(rf_pred),
#     "xgboost_prediction": int(xgb_pred),
#     "isolation_forest_prediction": int(iso_pred),
#     "autoencoder_prediction": int(ae_pred)
# }

# import os
# import numpy as np
# import joblib
# import shap

# BASE_DIR = os.path.dirname(__file__)
# MODEL_DIR = os.path.join(BASE_DIR, "model")

# def load_model(filename):
#     path = os.path.join(MODEL_DIR, filename)
#     return joblib.load(path)

# # Load scaler
# scaler = load_model("feature_scaler.pkl")

# # Load models
# rf_model = load_model("model_random_forest.pkl")
# xgb_model = load_model("model_xgboost.pkl")
# iso_model = load_model("model_isolation_forest.pkl")
# autoencoder = load_model("model_autoencoder.pkl")

# explainer = shap.TreeExplainer(rf_model)

# def predict(data):
#     data = np.array(data).reshape(1, -1)

#     # Scale features
#     scaled = scaler.transform(data)

#     # Model predictions
#     rf_pred = rf_model.predict(scaled)[0]
#     xgb_pred = xgb_model.predict(scaled)[0]
#     iso_pred = iso_model.predict(scaled)[0]

#     # Autoencoder anomaly detection
#     reconstructed = autoencoder.predict(scaled)
#     recon_error = np.mean(np.square(scaled - reconstructed))

#     threshold = 0.01   # adjust based on training
#     ae_pred = 1 if recon_error > threshold else 0

#     shap_values = explainer.shap_values(scaled)

#     feature_importance = dict(zip(
#     ML_FEATURES,
#     shap_values[1][0]  # explanation for class 1 (risk)
# ))
#     return {
#         "random_forest_prediction": int(rf_pred),
#         "xgboost_prediction": int(xgb_pred),
#         "isolation_forest_prediction": int(iso_pred),
#         "autoencoder_prediction": int(ae_pred),
#         "feature_importance": feature_importance
        
#     }





import os
import numpy as np
import joblib
import shap

BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "model")

# Feature list (must match training)
ML_FEATURES = [
    'central_allocated_funds','state_received_funds','district_received_funds',
    'project_budget','spent_amount','fund_utilization_rate',
    'delay_days','citizen_complaints','citizen_rating',
    'fund_leakage_pct','central_state_gap_pct','state_district_gap_pct',
    'vendor_concentration','state_absorption_rate','district_absorption_rate',
    'budget_efficiency','planned_duration_days',
    'overspend','underutilized','citizen_risk','false_completion'
]

# ----------------------------
# Load models
# ----------------------------
def load_model(filename):
    path = os.path.join(MODEL_DIR, filename)
    return joblib.load(path)

scaler = load_model("feature_scaler.pkl")

rf_model = load_model("model_random_forest.pkl")
xgb_model = load_model("model_xgboost.pkl")
iso_model = load_model("model_isolation_forest.pkl")
autoencoder = load_model("model_autoencoder.pkl")

# SHAP explainer
explainer = shap.TreeExplainer(rf_model)

# ----------------------------
# Prediction function
# ----------------------------
def predict(data):

    # convert to numpy
    data = np.array(data).reshape(1, -1)

    # scale features
    scaled = scaler.transform(data)

    # ----------------------------
    # Model predictions
    # ----------------------------
    rf_pred = rf_model.predict(scaled)[0]
    xgb_pred = xgb_model.predict(scaled)[0]
    iso_pred = iso_model.predict(scaled)[0]

    # ----------------------------
    # Autoencoder anomaly detection
    # ----------------------------
    reconstructed = autoencoder.predict(scaled)
    recon_error = np.mean(np.square(scaled - reconstructed))

    threshold = 0.01
    ae_pred = 1 if recon_error > threshold else 0

    # ----------------------------
    # SHAP Explainability
    # ----------------------------
    shap_values = explainer.shap_values(scaled)

    # handle both cases (binary / single output)
    if isinstance(shap_values, list):
        shap_array = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
    else:
        shap_array = shap_values[0]

    # convert to plain floats
    shap_array = np.array(shap_array).flatten()

    feature_importance = dict(zip(ML_FEATURES, shap_array))

    top_features = sorted(
        feature_importance.items(),
        key=lambda x: abs(float(x[1])),
        reverse=True
    )[:5]

    explanation = [
        {"feature": f, "impact": float(v)}
        for f, v in top_features
    ]

    # ----------------------------
    # Risk Score (ensemble)
    # ----------------------------
    iso_flag = 1 if iso_pred == -1 else 0

    risk_score = (
        rf_pred * 0.35 +
        xgb_pred * 0.35 +
        iso_flag * 0.15 +
        ae_pred * 0.15
    )

    if risk_score > 0.6:
        risk_level = "HIGH"
    elif risk_score > 0.3:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    # ----------------------------
    # Final response
    # ----------------------------
    return {
        "prediction": {
            "random_forest_prediction": int(rf_pred),
            "xgboost_prediction": int(xgb_pred),
            "isolation_forest_prediction": int(iso_pred),
            "autoencoder_prediction": int(ae_pred)
        },
        "risk_score": float(risk_score),
        "risk_level": risk_level,
        "top_risk_factors": explanation
    }