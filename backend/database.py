from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# SQLite creates a file called 'tasks.db' in our backend folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

# Engine is responsible for connecting to our database
# check_same_thread=False is needed for SQLite in FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal is what we use to talk to the database (run queries)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class which all our database models will inherit from
Base = declarative_base()
