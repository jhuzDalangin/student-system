import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm.jsx";
import StudentList from "../components/StudentList.jsx";
import { getStudents } from "../services/studentsApi.js";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    getStudents()
      .then((data) => {
        setStudents(data);
        setLoadStatus("success");
      })
      .catch((error) => {
        setLoadError(
          error instanceof Error ? error.message : String(error)
        );
        setLoadStatus("error");
      });
  }, []);

  function addStudent(newStudent) {
    setStudents((current) => [
      newStudent    ,
      ...current,
    ]);
  }

  function deleteStudent(id) {
    setStudents((current) =>
      current.filter(
        (student) => student.id !== id
      )
    );
  }

  if (loadStatus === "loading") {
    return <p>Loading students...</p>;
  }
  if (loadStatus === "error") {
    return <p role="alert">Unable to load students: {loadError}</p>;
  }

  return (
    <main className="students-container">
      <h1>Students</h1>
      <div className="content-layout">
        <div className="form-column">
            <StudentForm onAdd={addStudent}/>
        </div>
        <div className="list-column">
            <StudentList students={students} onDelete={deleteStudent} />
        </div>
      </div>
    </main>
  );
}