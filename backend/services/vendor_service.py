from sqlalchemy.orm import Session
from sqlalchemy import func
from models.vendor import Vendor
from models.project import Project
from models.anomaly import Anomaly
from config import AnomalyThresholds as T


def get_all_vendors(db: Session):
    """Get all vendors with project count."""
    vendors = db.query(Vendor).all()
    result = []
    for v in vendors:
        project_count = db.query(func.count(Project.id)).filter(
            Project.vendor_id == v.id
        ).scalar() or 0
        result.append({
            "id": v.id,
            "vendor_name": v.vendor_name,
            "registration_id": v.registration_id,
            "contact_email": v.contact_email,
            "risk_score": v.risk_score,
            "project_count": project_count,
        })
    return result


def get_vendor_by_id(db: Session, vendor_id: int):
    """Get vendor details with their projects and anomalies."""
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        return None

    projects = db.query(Project).filter(Project.vendor_id == vendor_id).all()
    project_list = []
    for p in projects:
        anomalies = db.query(Anomaly).filter(Anomaly.project_id == p.id).all()
        project_list.append({
            "id": p.id,
            "project_name": p.project_name,
            "project_status": p.project_status,
            "project_budget": p.project_budget,
            "spent_amount": p.spent_amount,
            "fund_utilization_rate": p.fund_utilization_rate,
            "anomaly_count": len(anomalies),
            "anomaly_types": [a.anomaly_type for a in anomalies],
        })

    return {
        "id": vendor.id,
        "vendor_name": vendor.vendor_name,
        "registration_id": vendor.registration_id,
        "contact_email": vendor.contact_email,
        "risk_score": vendor.risk_score,
        "projects": project_list,
    }


def get_high_risk_vendors(db: Session):
    """Get vendors with risk_score above threshold."""
    vendors = db.query(Vendor).filter(
        Vendor.risk_score >= T.HIGH_RISK_VENDOR_SCORE
    ).order_by(Vendor.risk_score.desc()).all()

    result = []
    for v in vendors:
        project_count = db.query(func.count(Project.id)).filter(
            Project.vendor_id == v.id
        ).scalar() or 0
        anomaly_count = db.query(func.count(Anomaly.id)).join(
            Project, Project.id == Anomaly.project_id
        ).filter(Project.vendor_id == v.id).scalar() or 0

        result.append({
            "id": v.id,
            "vendor_name": v.vendor_name,
            "registration_id": v.registration_id,
            "risk_score": v.risk_score,
            "project_count": project_count,
            "anomaly_count": anomaly_count,
        })
    return result
