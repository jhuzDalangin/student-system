from flask import Flask, request

app = Flask(__name__)

students = [
    {
        "id": 1,
        "fullName": "John Doe",
        "studentNumber": "2024-001",
        "program": "Bachelor of Science in Computer Science",
        "status": "Enrolled",
    },
    {
        "id": 2,
        "fullName": "Jane Smith",
        "studentNumber": "2024-002",
        "program": "Bachelor of Science in Information Technology",
        "status": "Pending",
    },
]


@app.get("/api/health")
def health():
  return {"status": "ok"}


@app.get("/api/students")
def list_students():
  return students


@app.post("/api/students")
def create_student():
  data = request.get_json(silent=True) or {}
  fullName = str(data.get("fullName", "")).strip()

  if not fullName:
    return {"error": "fullName is required"}, 400

  student = {
      "id": max((item["id"] for item in students), default=0) + 1,
      "fullName": fullName,
      "studentNumber": str(data.get("studentNumber", "")).strip(),
      "program": str(data.get("program", "")).strip(),
      "status": str(data.get("status", "Enrolled")),
  }
  students.append(student)
  return student, 201

@app.delete("/api/students/<int:student_id>")
def delete_student(student_id):
    student = next((item for item in students if item["id"] == student_id), None)

    if student is None:
        return {"error": "Student not found"}, 404

    students.remove(student)
    return "", 204