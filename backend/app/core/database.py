# import os
# from sqlalchemy import create_engine
# from sqlalchemy.orm import declarative_base, sessionmaker

# # Get database URL — supports Railway env var and local .env via config
# DATABASE_URL = os.getenv("DATABASE_URL")

# # Fallback to local PostgreSQL if not set
# if not DATABASE_URL:
#     from dotenv import load_dotenv
#     load_dotenv()
#     DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:shreyash@localhost:5432/hackoholics_db")

# # Fix Railway postgres:// URL for SQLAlchemy compatibility
# if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
#     DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# # Create database engine
# engine = create_engine(
#     DATABASE_URL,
#     pool_pre_ping=True
# )

# # Create session factory
# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# # Base class for models
# Base = declarative_base()


# # Dependency for database session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()



import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

# Railway sometimes uses postgres:// instead of postgresql://
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()