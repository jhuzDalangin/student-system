from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

BASE_DIR = Path(__file__).resolve().parent
INSTANCE_DIR = BASE_DIR / "instance"
INSTANCE_DIR.mkdir(exist_ok=True)
DATABASE_PATH = INSTANCE_DIR / "student.db"

engine = create_engine(f"sqlite:///{DATABASE_PATH}")
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass