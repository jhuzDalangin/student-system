from flask import Flask, request
from sqlalchemy import select
from database import Base, SessionLocal, engine
from models import Student

app = Flask(__name__)
Base.metadata.create_all(engine)

def student_to_dict(student):
    return {
        "id": student.id,
        "fullName": student.fullName,
        "studentNumber": student.studentNumber,
        "program": student.program,
        "status": student.status,
    }

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/students")
def list_students():
    with SessionLocal() as db:
        items = db.scalars(select(Student).order_by(Student.id)).all()
        return [student_to_dict(item) for item in items]

@app.post("/api/students")
def create_student():
    data = request.get_json(silent=True) or {}
    fullName = str(data.get("fullName", "")).strip()

    if not fullName:
        return {"error": "fullName is required"}, 400

    student = Student(
        fullName=fullName,
        studentNumber=str(data.get("studentNumber", "")).strip(),
        program=str(data.get("program", "")).strip(),
        status=str(data.get("status", "Enrolled")).strip() or "Enrolled",
    )
    
    with SessionLocal() as db:
        db.add(student)
        db.commit()
        db.refresh(student)
        return student_to_dict(student), 201

@app.delete("/api/students/<int:student_id>")
def delete_student(student_id):
    with SessionLocal() as db:
        student = db.get(Student, student_id)
        if student is None:
            return {"error": "Student not found"}, 404
        
        db.delete(student)
        db.commit()
        return "", 204

if __name__ == "__main__":
    app.run(debug=True)