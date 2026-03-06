from typing import List, Dict
from utils.feature_engineering import compute_project_features, compute_risk_label


def get_risk_assessment(project) -> Dict:
    """Full risk assessment for a project.

    Combines rule-based risk signals with mock ML model scores
    using the weighted formula:
        final_risk = 0.35 * rule_based
                   + 0.20 * autoencoder
                   + 0.20 * isolation_forest
                   + 0.15 * lapse_probability
                   + 0.10 * xgboost

    In production, autoencoder/isolation/xgb scores come from loaded .pkl models.
    For demo, they use realistic mock scores derived from features.
    """
    features = compute_project_features(project)

    # ── Rule-based risk (0.0 - 1.0) ────────────────────────────────
    risk_signals = []
    anomaly_flags = []

    utilization = features["fund_utilization_rate"]
    if utilization < 0.3:
        risk_signals.append(0.8)
        anomaly_flags.append("Budget underutilization")
    elif utilization > 1.1:
        risk_signals.append(0.9)
        anomaly_flags.append("Budget overspending")
    else:
        risk_signals.append(max(0, abs(utilization - 0.7) * 0.5))

    if features["central_state_gap_pct"] > 0.10:
        risk_signals.append(0.7)
        anomaly_flags.append("Central-state fund leakage")

    if features["state_district_gap_pct"] > 0.10:
        risk_signals.append(0.7)
        anomaly_flags.append("State-district fund leakage")

    if features["delay_days"] > 180:
        risk_signals.append(min(0.5 + features["delay_days"] / 1000, 1.0))
        anomaly_flags.append("Significant project delay")

    if features["citizen_risk"]:
        risk_signals.append(0.6)
        anomaly_flags.append("Citizen complaint risk")

    if features["false_completion"]:
        risk_signals.append(0.9)
        anomaly_flags.append("False completion suspicion")

    if features["fund_leakage_pct"] > 0.5:
        risk_signals.append(0.75)
        anomaly_flags.append("High fund leakage")

    rule_based_risk = sum(risk_signals) / max(len(risk_signals), 1)

    # ── Mock ML scores (realistic, feature-derived) ─────────────────
    # These mock ML scores in a way that correlates with actual features
    # so the demo feels realistic
    autoencoder_score = _mock_autoencoder(features)
    isolation_score = _mock_isolation_forest(features)
    lapse_probability = _mock_lapse_predictor(features)
    xgb_probability = _mock_xgboost(features)

    # ── Final weighted risk score ───────────────────────────────────
    final_risk = (
        0.35 * rule_based_risk
        + 0.20 * autoencoder_score
        + 0.20 * isolation_score
        + 0.15 * lapse_probability
        + 0.10 * xgb_probability
    )
    final_risk = round(min(max(final_risk, 0), 1.0), 3)

    risk_label = compute_risk_label(final_risk)

    # Top risk factors
    top_factors = sorted([
        {"factor": "Rule-based analysis", "score": round(rule_based_risk, 3)},
        {"factor": "Autoencoder anomaly", "score": round(autoencoder_score, 3)},
        {"factor": "Isolation forest", "score": round(isolation_score, 3)},
        {"factor": "Budget lapse risk", "score": round(lapse_probability, 3)},
        {"factor": "XGBoost classifier", "score": round(xgb_probability, 3)},
    ], key=lambda x: x["score"], reverse=True)

    return {
        "project_id": project.id,
        "project_name": project.project_name,
        "risk_score": final_risk,
        "risk_label": risk_label,
        "anomalies": anomaly_flags,
        "model_scores": {
            "rule_based": round(rule_based_risk, 3),
            "autoencoder": round(autoencoder_score, 3),
            "isolation_forest": round(isolation_score, 3),
            "lapse_probability": round(lapse_probability, 3),
            "xgboost": round(xgb_probability, 3),
        },
        "top_risk_factors": top_factors,
        "features": features,
    }


# ── Mock ML model functions ─────────────────────────────────────────
# These provide realistic scores based on features rather than flat constants

def _mock_autoencoder(features: dict) -> float:
    """Mock autoencoder: high reconstruction error for unusual patterns."""
    score = 0.0
    if features["underutilized"]:
        score += 0.4
    if features["central_state_gap_pct"] > 0.15:
        score += 0.3
    if features["fund_leakage_pct"] > 0.5:
        score += 0.3
    return min(score, 1.0)


def _mock_isolation_forest(features: dict) -> float:
    """Mock isolation forest: outlier detection based on feature deviations."""
    outlier_signals = 0
    total = 5

    if features["fund_utilization_rate"] < 0.2 or features["fund_utilization_rate"] > 1.2:
        outlier_signals += 1
    if features["delay_days"] > 365:
        outlier_signals += 1
    if features["central_state_gap_pct"] > 0.2:
        outlier_signals += 1
    if features["citizen_complaints"] > 5:
        outlier_signals += 1
    if features["overspend"]:
        outlier_signals += 1

    return outlier_signals / total


def _mock_lapse_predictor(features: dict) -> float:
    """Mock budget lapse probability predictor."""
    if features["fund_utilization_rate"] < 0.3:
        return 0.7 + (0.3 - features["fund_utilization_rate"])
    elif features["fund_utilization_rate"] < 0.5:
        return 0.4
    elif features["fund_utilization_rate"] < 0.8:
        return 0.2
    else:
        return 0.1


def _mock_xgboost(features: dict) -> float:
    """Mock XGBoost fraud probability."""
    score = 0.1  # base
    if features["false_completion"]:
        score += 0.5
    if features["citizen_risk"]:
        score += 0.2
    if features["central_state_gap_pct"] > 0.1:
        score += 0.15
    if features["state_district_gap_pct"] > 0.1:
        score += 0.1
    return min(score, 1.0)
