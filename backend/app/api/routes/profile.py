"""API Routes for User Profiles / Locations."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.models.user_profile import UserProfile

router = APIRouter()

class ProfileLocationUpdate(BaseModel):
    user_email: str
    state: str
    district: str
    pincode: str = ""

@router.put("/location", response_model=dict)
def update_profile_location(
    data: ProfileLocationUpdate, 
    db: Session = Depends(get_db)
):
    """Update or create a user's location preferences."""
    profile = db.query(UserProfile).filter(UserProfile.user_email == data.user_email).first()
    
    if profile:
        profile.state = data.state
        profile.district = data.district
        profile.pincode = data.pincode
    else:
        profile = UserProfile(
            user_email=data.user_email,
            state=data.state,
            district=data.district,
            pincode=data.pincode
        )
        db.add(profile)
        
    db.commit()
    return {"status": "success", "message": "Location updated successfully"}
