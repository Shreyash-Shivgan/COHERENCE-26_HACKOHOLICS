# # # from fastapi import APIRouter

# # # router = APIRouter()

# # # @router.get("/")
# # # def get_projects():
# # #     return {"projects": []}


# # from fastapi import APIRouter, Depends
# # from sqlalchemy.orm import Session

# # from app.core.database import get_db
# # from app.schemas.project_schema import ProjectCreate
# # from app.services.project_service import create_project, get_projects

# # router = APIRouter()


# # @router.post("/projects")
# # def create_new_project(project: ProjectCreate, db: Session = Depends(get_db)):
# #     return create_project(db, project)


# # @router.get("/projects")
# # def list_projects(db: Session = Depends(get_db)):
# #     return get_projects(db)


# # from sqlalchemy import Column, Integer, String, Float
# # from app.core.database import Base


# # class Project(Base):
# #     __tablename__ = "projects"

# #     project_id = Column(Integer, primary_key=True, index=True)
# #     project_name = Column(String, nullable=False)
# #     project_type = Column(String)
# #     project_budget = Column(Float)
# #     project_status = Column(String)



# from fastapi import APIRouter
# from app.services.project_service import create_project, get_projects

# router = APIRouter()

# @router.get("/projects")
# def fetch_projects():
#     return get_projects()


# @router.post("/projects")
# def add_project(project: dict):
#     return create_project(project)


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.services.project_service import create_project, get_projects
from app.dependencies import get_db
from app.schemas.project_schema import ProjectCreate

router = APIRouter()


@router.get("/projects")
def fetch_projects(db: Session = Depends(get_db)):
    return get_projects(db)


@router.post("/projects")
def add_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(db, project)