from fastapi import FastAPI
from app.api.router import api_router

app = FastAPI(
    title="Government Budget Flow Tracker",
    version="1.0"
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Budget Intelligence Platform API"}