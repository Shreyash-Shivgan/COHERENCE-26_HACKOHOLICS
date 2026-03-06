import os
import numpy as np

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

def predict(data):
    """Mock prediction function to bypass memory issues with real models."""
    
    # Return a static result for demonstration
    risk_score = 0.45 
    risk_level = "MEDIUM"
    
    explanation = [
        {"feature": f, "impact": 0.15 - (i * 0.02)}
        for i, f in enumerate(ML_FEATURES[:5])
    ]
    
    return {
        "prediction": {
            "random_forest_prediction": 1,
            "xgboost_prediction": 1,
            "isolation_forest_prediction": 0,
            "autoencoder_prediction": 0
        },
        "risk_score": float(risk_score),
        "risk_level": risk_level,
        "top_risk_factors": explanation
    }