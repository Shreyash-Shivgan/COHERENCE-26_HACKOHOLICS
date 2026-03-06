from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.router import api_router
from app.api.predict import router as predict_router
from app.core.database import Base, engine, SessionLocal
from app.config import CORS_ORIGINS

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

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all API routes
app.include_router(api_router, prefix="/api")
app.include_router(predict_router, prefix="/api/predict")


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
