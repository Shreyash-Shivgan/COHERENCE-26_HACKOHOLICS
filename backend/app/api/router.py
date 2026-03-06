from fastapi import APIRouter
from app.api.routes import budget, anomaly, projects, citizens, auth

api_router = APIRouter()

api_router.include_router(budget.router, prefix="/budget", tags=["Budget"])
api_router.include_router(anomaly.router, prefix="/anomaly", tags=["Anomaly"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(citizens.router, prefix="/citizens", tags=["Citizens"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])