from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.project_model import Project
from app.schemas.project_schema import ProjectCreate, ProjectResponse

router = APIRouter()


@router.get("/", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@router.post("/", response_model=ProjectResponse)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    proj = Project(**data.model_dump())
    db.add(proj)
    db.commit()
    db.refresh(proj)
    
    # --- Location-Based Notification Logic ---
    if proj.district:
        from app.models.user_profile import UserProfile
        from app.models.notification import Notification
        
        # Format budget for display (e.g., ₹50,00,000)
        budget_str = f"₹{proj.project_budget:,.0f}" if proj.project_budget else "an unspecified amount"
        
        # Find users in this district
        users_in_district = db.query(UserProfile).filter(
            UserProfile.district.ilike(f"%{proj.district}%")
        ).all()
        
        # Create notifications
        notifications = []
        for user in users_in_district:
            notif = Notification(
                user_email=user.user_email,
                title="New Local Project Allocated",
                message=f"A new project '{proj.project_name}' has been allocated to {proj.district} with a budget of {budget_str}. Department: {proj.department or 'N/A'}.",
                is_read=False
            )
            notifications.append(notif)
            
        if notifications:
            db.bulk_save_objects(notifications)
            db.commit()
            
    return proj