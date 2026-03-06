# # from fastapi import FastAPI
# # from app.api.router import api_router
# # from app.core.database import Base, engine

# # Base.metadata.create_all(bind=engine)

# # app = FastAPI(
# #     title="Government Budget Flow Tracker",
# #     version="1.0"
# # )

# # app.include_router(api_router, prefix="/api")



# # @app.get("/")
# # def root():
# #     return {"message": "Budget Intelligence Platform API"}

# from fastapi import FastAPI
# from app.api.routes import projects

# app = FastAPI()

# app.include_router(projects.router)

# @app.get("/")
# def root():
#     return {"message": "Hackoholics Budget Intelligence API"}



from fastapi import FastAPI
from app.api.routes import projects
from sqlalchemy import text
from app.core.database import engine
from app.core.database import Base, engine
# from app.models import project

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(projects.router)



@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "Database connected successfully"}
    except Exception as e:
        return {"error": str(e)}