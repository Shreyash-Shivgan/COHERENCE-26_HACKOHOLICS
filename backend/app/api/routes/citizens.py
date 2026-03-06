from fastapi import APIRouter

router = APIRouter()

@router.get("/complaints")
def get_complaints():
    return {"complaints": []}