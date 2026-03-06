"""
Notification system stub for citizen verification workflow.
In production, this would integrate with SMS/email/push notification services.
For demo purposes, notifications are stored in-memory and logged to console.
"""

import datetime
from typing import List, Dict

# In-memory notification store (would be a DB table or message queue in production)
_notifications: List[Dict] = []


def notify_citizens_for_verification(project_id: int, message: str):
    """Send a notification to citizens about project completion verification.

    In production this would:
    - Look up citizens in the project's district
    - Send SMS/email/push notifications
    - Track delivery status

    For demo, we store in memory and print.
    """
    notification = {
        "id": len(_notifications) + 1,
        "project_id": project_id,
        "message": message,
        "status": "sent",
        "created_at": datetime.datetime.utcnow().isoformat(),
    }
    _notifications.append(notification)
    print(f"[NOTIFICATION] Project {project_id}: {message}")
    return notification


def get_notifications(project_id: int = None) -> List[Dict]:
    """Get all notifications, optionally filtered by project_id."""
    if project_id is not None:
        return [n for n in _notifications if n["project_id"] == project_id]
    return _notifications.copy()


def clear_notifications():
    """Clear all notifications (for testing)."""
    _notifications.clear()
