"""API Routes for In-App Notifications."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.models.notification import Notification

router = APIRouter()

@router.get("/")
def get_user_notifications(email: str, db: Session = Depends(get_db)):
    """Get all notifications for a specific user, ordered by newest first."""
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    notifications = db.query(Notification)\
        .filter(Notification.user_email == email)\
        .order_by(Notification.created_at.desc())\
        .limit(50)\
        .all()
        
    return notifications

@router.put("/{notification_id}/read")
def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    """Mark a specific notification as read."""
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    notification.is_read = True
    db.commit()
    return {"status": "success", "is_read": True}
    
@router.put("/read-all")
def mark_all_read(email: str, db: Session = Depends(get_db)):
    """Mark all notifications for a user as read."""
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    db.query(Notification).filter(
        Notification.user_email == email, 
        Notification.is_read == False
    ).update({"is_read": True})
    
    db.commit()
    return {"status": "success"}
