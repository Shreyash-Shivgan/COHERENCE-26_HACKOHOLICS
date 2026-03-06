from fastapi import APIRouter
from app.api.routes import budget, anomaly, projects, citizens, auth, dashboard

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(anomaly.router, prefix="/anomalies", tags=["Anomalies"])
api_router.include_router(citizens.router, prefix="/complaints", tags=["Complaints"])
api_router.include_router(budget.router, prefix="/budget", tags=["Budget"])