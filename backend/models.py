from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True)
    fullName: Mapped[str] = mapped_column(String(120), nullable=False)
    studentNumber: Mapped[str] = mapped_column(String(50), nullable=False)
    program: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="Enrolled")