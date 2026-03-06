import datetime


def compute_project_features(project) -> dict:
    """Compute derived features from a project for ML input and risk scoring."""
    budget = project.project_budget or 0
    spent = project.spent_amount or 0
    central = project.central_allocated_funds or 0
    state_recv = project.state_received_funds or 0
    dist_recv = project.district_received_funds or 0
    complaints = project.citizen_complaints or 0
    rating = project.citizen_rating or 0

    # Fund utilization
    utilization = spent / budget if budget > 0 else 0

    # Gap percentages
    fund_leakage_pct = (central - spent) / central if central > 0 else 0
    central_state_gap_pct = (central - state_recv) / central if central > 0 else 0
    state_district_gap_pct = (state_recv - dist_recv) / state_recv if state_recv > 0 else 0

    # Absorption rates
    state_absorption_rate = state_recv / central if central > 0 else 0
    district_absorption_rate = dist_recv / state_recv if state_recv > 0 else 0

    # Budget efficiency
    budget_efficiency = spent / central if central > 0 else 0

    # Delay days
    delay_days = 0
    planned_duration_days = 0
    now = datetime.datetime.utcnow()

    if project.expected_completion:
        try:
            expected = datetime.datetime.strptime(project.expected_completion, "%Y-%m-%d")
            if project.actual_completion:
                actual = datetime.datetime.strptime(project.actual_completion, "%Y-%m-%d")
                delay_days = max(0, (actual - expected).days)
            elif project.project_status != "Completed":
                delay_days = max(0, (now - expected).days)
        except (ValueError, TypeError):
            pass

    if project.project_start_date and project.expected_completion:
        try:
            start = datetime.datetime.strptime(project.project_start_date, "%Y-%m-%d")
            end = datetime.datetime.strptime(project.expected_completion, "%Y-%m-%d")
            planned_duration_days = max(0, (end - start).days)
        except (ValueError, TypeError):
            pass

    # Boolean risk indicators
    overspend = 1 if utilization > 1.1 else 0
    underutilized = 1 if utilization < 0.3 else 0
    citizen_risk = 1 if complaints >= 3 or (rating > 0 and rating < 2) else 0
    false_completion = 1 if (project.project_status == "Completed"
                             and complaints >= 3
                             and not project.completion_verified) else 0

    return {
        "central_allocated_funds": central,
        "state_received_funds": state_recv,
        "district_received_funds": dist_recv,
        "project_budget": budget,
        "spent_amount": spent,
        "fund_utilization_rate": round(utilization, 4),
        "delay_days": delay_days,
        "citizen_complaints": complaints,
        "citizen_rating": rating,
        "fund_leakage_pct": round(fund_leakage_pct, 4),
        "central_state_gap_pct": round(central_state_gap_pct, 4),
        "state_district_gap_pct": round(state_district_gap_pct, 4),
        "vendor_concentration": 0,  # computed at batch level
        "state_absorption_rate": round(state_absorption_rate, 4),
        "district_absorption_rate": round(district_absorption_rate, 4),
        "budget_efficiency": round(budget_efficiency, 4),
        "planned_duration_days": planned_duration_days,
        "overspend": overspend,
        "underutilized": underutilized,
        "citizen_risk": citizen_risk,
        "false_completion": false_completion,
    }


def compute_risk_label(score: float) -> str:
    """Convert a numeric risk score to a human-readable label."""
    if score < 0.3:
        return "Low"
    elif score < 0.6:
        return "Medium"
    else:
        return "High"
