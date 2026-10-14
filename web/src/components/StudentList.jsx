import StudentCard from "./StudentCard";

export default function StudentList({ students, onDelete }) {
  if (students.length === 0) return <p>No students yet.</p>;
  return (
    <section>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onDelete={onDelete} />
      ))}
    </section>
  );
}