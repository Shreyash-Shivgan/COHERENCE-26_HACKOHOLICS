"""Quick script to drop all tables, recreate them, and re-seed."""
import os
import sys

sys.path.insert(0, os.path.abspath("."))

from dotenv import load_dotenv
load_dotenv()

from app.core.database import Base, engine, SessionLocal
import app.models  # noqa: F401 – register all models
from app.seed import seed_database

print("Dropping tables...")
Base.metadata.drop_all(bind=engine)

print("Creating tables...")
Base.metadata.create_all(bind=engine)

print("Seeding database...")
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

print("Done!")
