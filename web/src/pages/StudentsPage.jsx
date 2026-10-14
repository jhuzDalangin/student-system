import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm.jsx";
import StudentList from "../components/StudentList.jsx";
import { createStudent, deleteStudentApi, getStudents } from "../services/studentsApi.js";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getStudents()
      .then((data) => {
        setStudents(data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  async function addStudent(studentData) {
    setApiError("");
    try {
      const createdStudent = await createStudent(studentData);
      setStudents((current) => [createdStudent, ...current]);
    } catch (error) {
      setApiError(error.message);
    }
  }

  async function deleteStudent(id) {
    setApiError("");
    try {
      await deleteStudentApi(id);
      setStudents((current) => current.filter((student) => student.id !== id));
    } catch (error) {
      setApiError(error.message);
    }
  }

  if (status === "loading") return <p>Loading students...</p>;
  if (status === "error") return <p>Unable to load students from the API.</p>;

  return (
    <main className="students-container">
      <h1>Students</h1>
      {apiError && <p role="alert" style={{ color: "#ef4444" }}>{apiError}</p>}
      
      <div className="content-layout">
        <div className="form-column">
          <StudentForm onAdd={addStudent} />
        </div>
        <div className="list-column">
          <StudentList students={students} onDelete={deleteStudent} />
        </div>
      </div>
    </main>
  );
}