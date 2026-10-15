/**
 * Student Retrieval API with Modular Handlers
 *
 * This Express.js server demonstrates:
 * 1. Separating route logic into named handler functions (modularity).
 * 2. Registering those handlers with `app.get()`.
 * 3. Retrieving all students (GET /students).
 * 4. Retrieving a single student by ID (GET /students/:id).
 * 5. Handling 404 errors when a student does not exist.
 *
 * Note: Separating handlers from routes keeps the code clean,
 * testable, and easier to maintain as the application grows.
 */

const express = require("express");

const app = express();

// In-memory data store with two pre-seeded students
const students = [
  { id: 1, name: "Abebe" },
  { id: 2, name: "Hana" },
];

// Handler for retrieving all students
// Purpose: Returns the entire students array as JSON
function getAllStudents(req, res) {
  res.json(students);
}

// Handler for retrieving one student
// Purpose: Finds a student by id and returns it, or 404 if not found
function getStudentById(req, res) {
  // Convert the URL parameter from a string to a number
  const id = Number(req.params.id);

  // Search the array for a matching student
  const student = students.find((item) => item.id === id);

  // If no student matches, return 404 Not Found
  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  // Return the found student
  res.json(student);
}

// Register the handlers with their corresponding routes
// GET /students      → getAllStudents
// GET /students/:id  → getStudentById
app.get("/students", getAllStudents);
app.get("/students/:id", getStudentById);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
