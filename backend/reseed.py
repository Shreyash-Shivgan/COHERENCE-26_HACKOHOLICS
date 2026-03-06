from app.core.database import engine, Base
from app.seed import seed_database
from sqlalchemy.orm import Session
import app.models
from app.core.database import SessionLocal

print("Dropping tables...")
Base.metadata.drop_all(bind=engine)
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Seeding database...")
db = SessionLocal()
try:
    seed_database(db)
except Exception as e:
    print("Error:", e)
finally:
    db.close()
print("Done!")
