import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm.jsx";
import StudentList from "../components/StudentList.jsx";
import { getStudents } from "../services/studentsApi.js";

export default function StudentsPage() {
  const [fullName, setFullName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [program, setProgram] = useState("");
  const [status, setStatus] = useState("enrolled");

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

  if (status === "loading") {
    return <p>Loading students...</p>;
  }
  if (status === "error") {
    return <p>Unable to load students.</p>;
  }

  return (
    <main>
      <h1>Students</h1>
      <StudentForm
        onAdd={addStudent}
      />
      <StudentList
        students={students}
        onDelete={deleteStudent}
      />
    </main>
  );
}