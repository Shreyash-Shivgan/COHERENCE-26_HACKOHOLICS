from fastapi import APIRouter
from app.api.routes import budget, anomaly, projects, citizens, auth, dashboard, aadhaar, notifications, profile

api_router = APIRouter()

api_router.include_router(budget.router, prefix="/budget", tags=["Budget"])
api_router.include_router(anomaly.router, prefix="/anomaly", tags=["Anomaly"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(citizens.router, prefix="/citizens", tags=["Citizens"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(aadhaar.router, prefix="/aadhaar", tags=["Aadhaar Verification"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(profile.router, prefix="/profile", tags=["User Profile"])