export async function getStudents() {
  const response = await fetch("/api/students");
  if (!response.ok) {
    throw new Error(`Could not load students (${response.status})`);
  }
  return response.json();
}

export async function createStudent(payload) {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Could not create student (${response.status})`);
  }
  return response.json();
}

export async function deleteStudentApi(id) {
  const response = await fetch(`/api/students/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Could not delete student (${response.status})`);
  }
}