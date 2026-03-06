from sqlalchemy.orm import Session
from sqlalchemy import func
from models.project import Project
from models.state import State
from models.district import District
from models.scheme import Scheme


def get_state_budget_summary(db: Session):
    """Central → State gap per state."""
    results = db.query(
        State.id,
        State.name,
        func.count(Project.id).label("project_count"),
        func.sum(Project.central_allocated_funds).label("total_central"),
        func.sum(Project.state_received_funds).label("total_state_received"),
        func.sum(Project.project_budget).label("total_budget"),
        func.sum(Project.spent_amount).label("total_spent"),
    ).join(Project, Project.state_id == State.id
    ).group_by(State.id, State.name).all()

    summary = []
    for r in results:
        central = r.total_central or 0
        state_recv = r.total_state_received or 0
        budget = r.total_budget or 0
        spent = r.total_spent or 0
        gap = central - state_recv
        gap_pct = (gap / central * 100) if central > 0 else 0
        utilization = (spent / budget * 100) if budget > 0 else 0

        summary.append({
            "state_id": r.id,
            "state": r.name,
            "project_count": r.project_count,
            "central_allocated": central,
            "state_received": state_recv,
            "central_state_gap": gap,
            "gap_percentage": round(gap_pct, 2),
            "total_budget": budget,
            "total_spent": spent,
            "utilization_pct": round(utilization, 2),
        })
    return summary


def get_district_budget_summary(db: Session):
    """State → District gap per district."""
    results = db.query(
        District.id,
        District.name,
        State.name.label("state_name"),
        func.count(Project.id).label("project_count"),
        func.sum(Project.state_received_funds).label("total_state_received"),
        func.sum(Project.district_received_funds).label("total_district_received"),
        func.sum(Project.project_budget).label("total_budget"),
        func.sum(Project.spent_amount).label("total_spent"),
    ).join(Project, Project.district_id == District.id
    ).join(State, District.state_id == State.id
    ).group_by(District.id, District.name, State.name).all()

    summary = []
    for r in results:
        state_recv = r.total_state_received or 0
        dist_recv = r.total_district_received or 0
        budget = r.total_budget or 0
        spent = r.total_spent or 0
        gap = state_recv - dist_recv
        gap_pct = (gap / state_recv * 100) if state_recv > 0 else 0
        utilization = (spent / budget * 100) if budget > 0 else 0

        summary.append({
            "district_id": r.id,
            "district": r.name,
            "state": r.state_name,
            "project_count": r.project_count,
            "state_received": state_recv,
            "district_received": dist_recv,
            "state_district_gap": gap,
            "gap_percentage": round(gap_pct, 2),
            "total_budget": budget,
            "total_spent": spent,
            "utilization_pct": round(utilization, 2),
        })
    return summary


def get_scheme_flow_summary(db: Session):
    """Scheme-level budget flow and utilization."""
    results = db.query(
        Scheme.id,
        Scheme.scheme_name,
        Scheme.ministry,
        func.count(Project.id).label("project_count"),
        func.sum(Project.central_allocated_funds).label("total_allocated"),
        func.sum(Project.project_budget).label("total_budget"),
        func.sum(Project.spent_amount).label("total_spent"),
    ).join(Project, Project.scheme_id == Scheme.id
    ).group_by(Scheme.id, Scheme.scheme_name, Scheme.ministry).all()

    summary = []
    for r in results:
        allocated = r.total_allocated or 0
        budget = r.total_budget or 0
        spent = r.total_spent or 0
        utilization = (spent / budget * 100) if budget > 0 else 0

        summary.append({
            "scheme_id": r.id,
            "scheme": r.scheme_name,
            "ministry": r.ministry,
            "project_count": r.project_count,
            "total_allocated": allocated,
            "total_budget": budget,
            "total_spent": spent,
            "utilization_pct": round(utilization, 2),
        })
    return summary
