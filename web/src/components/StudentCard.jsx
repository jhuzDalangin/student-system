export default function StudentCard({ student, onDelete }) {
  return (
    <article>
      <h2>{student.fullName || student.name}</h2>
      <p>Status: {student.status}</p>
      <button type="button" onClick={() => onDelete(student.id)}>Delete</button>
    </article>
  );
}