export async function getStudents() {
  const response = await fetch('/student.json')

  if (!response.ok) {
    throw new Error(`Could not load student records (${response.status})`)
  }

  const students = await response.json()
  if (!Array.isArray(students)) {
    throw new Error('Student data must be a list')
  }

  return students
}