from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_projects():
    return {"projects": []}