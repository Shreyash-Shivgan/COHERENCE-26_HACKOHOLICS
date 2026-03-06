# from sqlalchemy import Column, Integer, String, Float
# from app.core.database import Base

# class Project(Base):

#     __tablename__ = "projects"

#     id = Column(Integer, primary_key=True, index=True)

#     name = Column(String)
#     contractor = Column(String)

#     district = Column(String)

#     allocated_budget = Column(Float)

#     status = Column(String)


from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String)
    project_type = Column(String)
    project_budget = Column(Float)
    project_status = Column(String)