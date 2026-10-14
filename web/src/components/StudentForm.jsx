import { useState } from "react";

export default function StudentForm({ onAdd }) {
  const [fullName, setFullName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [program, setProgram] = useState("");
  const [status, setStatus] = useState("enrolled");
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanFullName = fullName.trim();
    if (!cleanFullName) return;

    setSubmitError("");

    try {
      await onAdd({ fullName: cleanFullName, studentNumber, program, status });

      setFullName("");
      setStudentNumber("");
      setProgram("");
      setStatus("enrolled");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>

      <label>
        Student Number
        <input value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
      </label>

      <label>
        Program
        <input value={program} onChange={(e) => setProgram(e.target.value)} />
      </label>

      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="enrolled">Enrolled</option>
          <option value="pending">Pending</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </label>

      {submitError && <p role="alert">{submitError}</p>}

      <button type="submit">Add Student</button>
    </form>
  );
}