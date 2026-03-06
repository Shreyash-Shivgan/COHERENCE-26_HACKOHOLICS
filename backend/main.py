from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
import models
from routes import project_routes, budget_routes, anomaly_routes, vendor_routes, citizen_routes, aadhaar_routes
from config import UPLOAD_DIR
import os

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Budget Flow Intelligence API",
    description="National Budget Flow Intelligence & Leakage Detection Platform",
    version="2.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for serving citizen photos
os.makedirs(UPLOAD_DIR, exist_ok=True)
uploads_base = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
app.mount("/uploads", StaticFiles(directory=uploads_base), name="uploads")

# Register routers
app.include_router(project_routes.router)
app.include_router(budget_routes.router)
app.include_router(anomaly_routes.router)
app.include_router(vendor_routes.router)
app.include_router(citizen_routes.router)
app.include_router(aadhaar_routes.router)


@app.get("/")
def root():
    return {"message": "Budget Intelligence Platform API (SQLite) is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
