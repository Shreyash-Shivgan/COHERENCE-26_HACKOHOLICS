# from sqlalchemy.orm import Session
# from app.models.project_model import Project


# def create_project(db: Session, project):
#     db_project = Project(**project.dict())

#     db.add(db_project)
#     db.commit()
#     db.refresh(db_project)

#     return db_project


# def get_projects(db: Session):
#     return db.query(Project).all()



from sqlalchemy.orm import Session
from app.models.project_model import Project

def create_project(db: Session, project):
    new_project = Project(
        project_name=project.project_name,
        project_type=project.project_type,
        project_budget=project.project_budget,
        project_status=project.project_status
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


def get_projects(db: Session):
    return db.query(Project).all()