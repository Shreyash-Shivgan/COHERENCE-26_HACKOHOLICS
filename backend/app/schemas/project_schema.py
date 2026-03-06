# from pydantic import BaseModel


# class ProjectCreate(BaseModel):
#     project_name: str
#     project_type: str
#     project_budget: float
#     project_status: str


# class ProjectResponse(ProjectCreate):
#     project_id: int

#     class Config:
#         orm_mode = True




from pydantic import BaseModel


class ProjectCreate(BaseModel):
    project_name: str
    project_type: str
    project_budget: float
    project_status: str


class Config:
    from_attributes = True