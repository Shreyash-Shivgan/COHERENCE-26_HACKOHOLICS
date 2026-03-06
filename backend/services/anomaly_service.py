import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.project import Project
from models.anomaly import Anomaly
from models.vendor import Vendor
from models.state import State
from config import AnomalyThresholds as T


def run_anomaly_scan(db: Session):
    """Run a full rule-based anomaly scan across all projects.
    Detects financial, project execution, vendor, and citizen anomalies.
    Returns a list of newly created anomaly records.
    """
    projects = db.query(Project).all()
    new_anomalies = []
    now = datetime.datetime.utcnow()

    for p in projects:
        detected = []

        # ── Financial anomalies ──────────────────────────────────────
        budget = p.project_budget or 0
        spent = p.spent_amount or 0
        central = p.central_allocated_funds or 0
        state_recv = p.state_received_funds or 0
        dist_recv = p.district_received_funds or 0
        utilization = spent / budget if budget > 0 else 0

        # Budget underutilization
        if budget > 0 and utilization < T.UNDERUTILIZATION_RATE:
            detected.append(("Budget underutilization",
                             0.7,
                             f"Utilization rate {utilization:.1%} is below {T.UNDERUTILIZATION_RATE:.0%} threshold"))

        # Budget overspending
        if budget > 0 and utilization > T.OVERSPENDING_RATE:
            detected.append(("Budget overspending",
                             0.8,
                             f"Spending at {utilization:.1%} exceeds budget by {(utilization-1)*100:.1f}%"))

        # Central → State leakage
        if central > 0:
            cs_gap_pct = (central - state_recv) / central
            if cs_gap_pct > T.CENTRAL_STATE_LEAKAGE_PCT:
                detected.append(("Central-state leakage",
                                 min(0.5 + cs_gap_pct, 1.0),
                                 f"{cs_gap_pct:.1%} gap between central allocation and state receipt"))

        # State → District leakage
        if state_recv > 0:
            sd_gap_pct = (state_recv - dist_recv) / state_recv
            if sd_gap_pct > T.STATE_DISTRICT_LEAKAGE_PCT:
                detected.append(("State-district leakage",
                                 min(0.5 + sd_gap_pct, 1.0),
                                 f"{sd_gap_pct:.1%} gap between state receipt and district receipt"))

        # District → Project fund diversion
        if dist_recv > 0:
            dp_gap_pct = (dist_recv - budget) / dist_recv
            if dp_gap_pct > T.DISTRICT_PROJECT_LEAKAGE_PCT:
                detected.append(("Fund diversion",
                                 min(0.5 + dp_gap_pct, 1.0),
                                 f"{dp_gap_pct:.1%} gap between district funds and project budget"))

        # ── Project execution anomalies ──────────────────────────────
        # Long project delays
        if p.expected_completion and p.actual_completion is None and p.project_status != "Completed":
            try:
                expected = datetime.datetime.strptime(p.expected_completion, "%Y-%m-%d")
                delay_days = (now - expected).days
                if delay_days > T.DELAY_DAYS_THRESHOLD:
                    detected.append(("Long project delay",
                                     min(0.5 + delay_days / 1000, 1.0),
                                     f"Project delayed by {delay_days} days past expected completion"))
            except (ValueError, TypeError):
                pass

        # Fake project completion (completed but high complaints)
        if p.project_status == "Completed" and (p.citizen_complaints or 0) >= T.FALSE_COMPLETION_COMPLAINTS:
            detected.append(("False completion suspicion",
                             0.85,
                             f"Project marked completed but has {p.citizen_complaints} citizen complaints"))

        # ── Citizen feedback anomalies ───────────────────────────────
        # Low rating despite completion
        if p.project_status == "Completed" and (p.citizen_rating or 0) > 0 and p.citizen_rating < T.LOW_RATING_THRESHOLD:
            detected.append(("Low rating despite completion",
                             0.65,
                             f"Completed project has citizen rating of {p.citizen_rating:.1f}/5"))

        # Complaint spike
        if (p.citizen_complaints or 0) >= T.COMPLAINT_SPIKE_THRESHOLD:
            detected.append(("Complaint spike",
                             0.70,
                             f"Project has {p.citizen_complaints} citizen complaints"))

        # ── Save detected anomalies ──────────────────────────────────
        for anomaly_type, score, description in detected:
            # Check if this anomaly already exists for this project
            existing = db.query(Anomaly).filter(
                Anomaly.project_id == p.id,
                Anomaly.anomaly_type == anomaly_type
            ).first()
            if not existing:
                anomaly = Anomaly(
                    project_id=p.id,
                    anomaly_type=anomaly_type,
                    anomaly_score=round(score, 3),
                    description=description,
                    created_at=now,
                )
                db.add(anomaly)
                new_anomalies.append({
                    "project_id": p.id,
                    "project_name": p.project_name,
                    "anomaly_type": anomaly_type,
                    "anomaly_score": round(score, 3),
                    "description": description,
                })

    # ── Vendor anomalies (cross-project) ─────────────────────────────
    vendor_anomalies = _detect_vendor_anomalies(db, now)
    new_anomalies.extend(vendor_anomalies)

    db.commit()
    return {"anomalies_detected": len(new_anomalies), "details": new_anomalies}


def _detect_vendor_anomalies(db: Session, now: datetime.datetime):
    """Detect vendor-level anomalies like monopoly and repeated delays."""
    vendor_anomalies = []

    # Vendor monopoly: a vendor with >60% of projects in any single district
    district_counts = db.query(
        Project.district_id,
        Project.vendor_id,
        func.count(Project.id).label("vendor_projects"),
    ).group_by(Project.district_id, Project.vendor_id).all()

    district_totals = db.query(
        Project.district_id,
        func.count(Project.id).label("total_projects"),
    ).group_by(Project.district_id).all()
    totals_map = {dt.district_id: dt.total_projects for dt in district_totals}

    for dc in district_counts:
        total = totals_map.get(dc.district_id, 0)
        if total >= 3:  # meaningful only with 3+ projects
            ratio = dc.vendor_projects / total
            if ratio > T.VENDOR_MONOPOLY_PCT:
                # Find projects for this vendor in this district and create anomaly on each
                projects = db.query(Project).filter(
                    Project.district_id == dc.district_id,
                    Project.vendor_id == dc.vendor_id,
                ).all()
                for p in projects:
                    existing = db.query(Anomaly).filter(
                        Anomaly.project_id == p.id,
                        Anomaly.anomaly_type == "Vendor monopoly"
                    ).first()
                    if not existing:
                        anomaly = Anomaly(
                            project_id=p.id,
                            anomaly_type="Vendor monopoly",
                            anomaly_score=round(min(0.5 + ratio, 1.0), 3),
                            description=f"Vendor holds {ratio:.0%} of projects in district",
                            created_at=now,
                        )
                        db.add(anomaly)
                        vendor_anomalies.append({
                            "project_id": p.id,
                            "project_name": p.project_name,
                            "anomaly_type": "Vendor monopoly",
                            "anomaly_score": round(min(0.5 + ratio, 1.0), 3),
                            "description": f"Vendor holds {ratio:.0%} of projects in district",
                        })

    # Update vendor risk scores based on anomaly count
    _update_vendor_risk_scores(db)

    return vendor_anomalies


def _update_vendor_risk_scores(db: Session):
    """Recalculate vendor risk scores based on project anomalies."""
    vendors = db.query(Vendor).all()
    for vendor in vendors:
        project_ids = [p.id for p in vendor.projects]
        if not project_ids:
            continue
        anomaly_count = db.query(func.count(Anomaly.id)).filter(
            Anomaly.project_id.in_(project_ids)
        ).scalar() or 0

        total_projects = len(project_ids)
        # Risk score: ratio of anomalies to projects, capped at 1.0
        risk = min(anomaly_count / (total_projects * 2), 1.0)
        vendor.risk_score = round(risk, 3)


def get_state_hotspots(db: Session):
    """Aggregate anomalies by state to find corruption hotspots."""
    results = db.query(
        State.id,
        State.name,
        func.count(Anomaly.id).label("anomaly_count"),
        func.avg(Anomaly.anomaly_score).label("avg_score"),
        func.max(Anomaly.anomaly_score).label("max_score"),
    ).join(Project, Project.state_id == State.id
    ).join(Anomaly, Anomaly.project_id == Project.id
    ).group_by(State.id, State.name
    ).order_by(func.count(Anomaly.id).desc()).all()

    return [
        {
            "state_id": r.id,
            "state": r.name,
            "anomaly_count": r.anomaly_count,
            "avg_risk_score": round(r.avg_score, 3) if r.avg_score else 0,
            "max_risk_score": round(r.max_score, 3) if r.max_score else 0,
        }
        for r in results
    ]
