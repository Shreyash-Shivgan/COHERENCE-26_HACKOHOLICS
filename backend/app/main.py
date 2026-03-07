from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlalchemy import text

from app.api.router import api_router
from app.api.predict import router as predict_router
from app.core.database import Base, engine, SessionLocal

# Import all models so they are registered with Base.metadata
import app.models  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables and seed data on startup."""
    Base.metadata.create_all(bind=engine)

    # Seed with initial data
    from app.seed import seed_database
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

    yield


app = FastAPI(
    title="GovFlow — Budget Intelligence Platform",
    description="National Budget Flow & Intelligence Platform API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server and Railway
import os
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000"
).split(",")

# Ensure 5174, 5175, 5176 are present, since Vite rotates ports
for port in ["5173", "5174", "5175", "5176"]:
    origin = f"http://localhost:{port}"
    if origin not in cors_origins:
        cors_origins.append(origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all API routes
app.include_router(api_router, prefix="/api")
app.include_router(predict_router, prefix="/api/predict")

# Mount uploads as static files
from fastapi.staticfiles import StaticFiles
from app.core.config import AADHAAR_UPLOAD_DIR
app.mount("/uploads", StaticFiles(directory=os.path.dirname(AADHAAR_UPLOAD_DIR)), name="uploads")


@app.get("/")
def root():
    return {
        "message": "GovFlow Budget Intelligence Platform API",
        "docs": "/docs",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "Database connected successfully"}
    except Exception as e:
        return {"error": str(e)}