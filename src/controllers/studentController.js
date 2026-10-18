/**
 * Student Controller
 *
 * This file demonstrates:
 * 1. The "Controller" part of the MVC pattern.
 * 2. Separating business logic (CRUD operations) from route definitions.
 * 3. Handling request/response logic and sending structured JSON.
 *
 * Why a Controller?
 *   In the previous topics, we wrote the route and the logic in the same file:
 *   app.get("/students", (req, res) => { ... })
 *
 *   As apps grow, that becomes messy. A controller is just a file full of
 *   functions. The router maps URLs to these functions.
 *   The controller NEVER knows what the URL is. It only knows about `req` and `res`.
 *
 * Pattern: "Object Export"
 *   Instead of exporting one function, we export an object containing all
 *   the controller functions. The router will destructure them.
 */

// In-memory data store (simulating a database)
let students = [
  {
    id: 1,
    name: "Abebe",
    department: "Software Engineering",
  },
  {
    id: 2,
    name: "Sara",
    department: "Information Systems",
  },
];

let nextId = 3;

// =================================================================
// CONTROLLER FUNCTIONS
// =================================================================

// GET: Retrieve all students
function getAllStudents(req, res) {
  res.status(200).json({
    success: true,
    data: students,
  });
}

// GET: Retrieve one student
function getStudentById(req, res) {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
}

// POST: Create a student
function createStudent(req, res) {
  const { name, department } = req.body;

  // Validation
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof department !== "string" ||
    !department.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and department are required",
    });
  }

  // Create and save the new student
  const student = {
    id: nextId++,
    name: name.trim(),
    department: department.trim(),
  };

  students.push(student);

  // Respond with 201 Created
  res.status(201).json({
    success: true,
    data: student,
  });
}

// PUT: Replace a student's information completely
function replaceStudent(req, res) {
  const id = Number(req.params.id);
  const { name, department } = req.body;

  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // PUT requires ALL fields
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof department !== "string" ||
    !department.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and department are required",
    });
  }

  // Replace the whole object
  students[index] = {
    id,
    name: name.trim(),
    department: department.trim(),
  };

  res.status(200).json({
    success: true,
    data: students[index],
  });
}

// PATCH: Update only provided fields
function updateStudent(req, res) {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  const { name, department } = req.body;

  // PATCH requires AT LEAST ONE field
  if (name === undefined && department === undefined) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update",
    });
  }

  // Validate only the fields that WERE provided
  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({
      success: false,
      message: "Name must be a non-empty string",
    });
  }

  if (
    department !== undefined &&
    (typeof department !== "string" || !department.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Department must be a non-empty string",
    });
  }

  // Apply the partial update
  if (name !== undefined) {
    student.name = name.trim();
  }

  if (department !== undefined) {
    student.department = department.trim();
  }

  res.status(200).json({
    success: true,
    data: student,
  });
}

// DELETE: Remove a student
function deleteStudent(req, res) {
  const id = Number(req.params.id);
  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  students.splice(index, 1);

  // 204 No Content means "Success, but there is nothing to return"
  res.status(204).end();
}

// Export all functions as a single object
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  replaceStudent,
  updateStudent,
  deleteStudent,
};
