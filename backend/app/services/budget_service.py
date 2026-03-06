from app.core.firebase import db
from app.models.project import Project

def create_budget(data):

    doc = db.collection("budgets").add(data)

    return {"id": doc[1].id, "data": data}