from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List

from app.core.database import get_db
from app.models.project_model import Project
from app.schemas.project_schema import ProjectCreate, ProjectResponse

router = APIRouter()


@router.get("/", response_model=List[ProjectResponse])
def list_projects(
    state: str = Query("Maharashtra"),
    district: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    scheme: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    vendor: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Project).filter(Project.state == state)
    if district:
        query = query.filter(Project.district == district)
    if department:
        query = query.filter(Project.department == department)
    if scheme:
        query = query.filter(Project.scheme == scheme)
    if status:
        query = query.filter(Project.project_status == status)
    if vendor:
        query = query.filter(Project.vendor == vendor)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Project.project_name.ilike(search_term)) |
            (Project.vendor.ilike(search_term))
        )

    return query.all()


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/{project_id}/flow")
def get_project_flow(project_id: int, db: Session = Depends(get_db)):
    """Generate a 6-level fund flow chain for a project (same logic as frontend)."""
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    total = project.project_budget or 0
    utilized = project.utilized_amount or 0
    state = project.state or "Maharashtra"
    district = project.district or "Mumbai"
    dept = project.department or "Ministry of Finance"
    scheme = project.scheme or ""
    vendor = project.vendor or ""
    status = project.project_status or "Ongoing"

    # Municipal body mapping
    municipal_bodies = {
        "Mumbai": "Brihanmumbai Municipal Corporation (BMC)",
        "Pune": "Pune Municipal Corporation",
        "Delhi": "Delhi Municipal Corporation",
        "Chennai": "Greater Chennai Corporation",
        "Bengaluru": "Bruhat Bengaluru Mahanagara Palike",
        "Hyderabad": "Greater Hyderabad Municipal Corporation",
        "Kolkata": "Kolkata Municipal Corporation",
    }
    municipal = municipal_bodies.get(district, f"{district} Municipal Corporation")

    flag_level = 5 if project.anomaly_flag else -1

    def mk_status(lvl):
        if lvl == flag_level:
            return "Flagged"
        if status == "Cancelled" and lvl >= 5:
            return "Pending"
        if status == "Delayed" and lvl >= 6:
            return "Pending"
        return "Disbursed"

    l1 = total * 1.4
    l2 = total * 1.15
    l3 = total * 1.05
    l4 = total
    l5 = round(total * 0.9)
    l6 = utilized

    dates = [
        "01 Apr 2024", "20 Apr 2024", "15 May 2024",
        "10 Jun 2024", "05 Jul 2024", "20 Jul 2024",
    ]

    flow = [
        {
            "level": 1,
            "levelLabel": "Union Budget",
            "entity": "Ministry of Finance, Government of India",
            "role": dept,
            "allocated": round(l1),
            "disbursed": round(l1),
            "utilized": round(l1 * 0.7),
            "date": dates[0],
            "status": "Disbursed",
        },
        {
            "level": 2,
            "levelLabel": "Central Ministry",
            "entity": dept,
            "role": f"Nodal ministry for {scheme}",
            "allocated": round(l2),
            "disbursed": round(l2),
            "utilized": round(l2 * 0.72),
            "date": dates[1],
            "status": mk_status(2),
        },
        {
            "level": 3,
            "levelLabel": "State Government",
            "entity": f"Government of {state}",
            "role": f"State Nodal Agency — {scheme}",
            "allocated": round(l3),
            "disbursed": round(l3),
            "utilized": round(l3 * 0.75),
            "date": dates[2],
            "status": mk_status(3),
        },
        {
            "level": 4,
            "levelLabel": "District / Municipal Body",
            "entity": municipal,
            "role": "District Implementation Unit",
            "allocated": round(l4),
            "disbursed": round(l4 * (0.4 if status == "Cancelled" else 0.95)),
            "utilized": round(l4 * 0.6),
            "date": dates[3],
            "status": mk_status(4),
        },
        {
            "level": 5,
            "levelLabel": "Ward / Project Office",
            "entity": f"{district} Ward Office – {scheme}",
            "role": "On-ground project management",
            "allocated": l5,
            "disbursed": round(l5 * (0.2 if status == "Cancelled" else 0.6 if status == "Delayed" else 0.9)),
            "utilized": round(l5 * (0.35 if status == "Delayed" else 0.65)),
            "date": dates[4],
            "status": mk_status(5),
            "alert": f"Utilization mismatch detected at ward level for {project.project_name}." if flag_level == 5 else None,
        },
        {
            "level": 6,
            "levelLabel": "Contractor / Implementer",
            "entity": vendor,
            "role": f"Executing agency — {project.project_name}",
            "allocated": round(total),
            "disbursed": round(utilized),
            "utilized": round(utilized),
            "date": dates[5],
            "status": "Flagged" if project.anomaly_flag else (
                "Disbursed" if status == "Completed" else
                "Pending" if status == "Cancelled" else
                "Partially Disbursed"
            ),
            "alert": (
                f"Completion claim submitted by {vendor} but field verification is pending. "
                f"Funds at risk: ₹{round((total - utilized) / 100000)}L."
            ) if project.anomaly_flag else None,
        },
    ]
    return flow


@router.post("/", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    new_project = Project(**project.model_dump())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project