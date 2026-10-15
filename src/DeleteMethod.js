/**
 * Student Deletion API
 *
 * This Express.js server demonstrates:
 * 1. Using URL parameters (:id) to target a specific student.
 * 2. DELETE /students/:id → Finds and removes a student from the in-memory array.
 * 3. GET /students → Retrieves the current list of students.
 * 4. Proper error handling for missing resources (404).
 *
 * Note: No express.json() middleware is needed here because
 * DELETE and GET requests do not send a request body.
 */

const express = require("express");

const app = express();

// In-memory data store with three pre-seeded students
const students = [
  { id: 1, name: "Abebe" },
  { id: 2, name: "Hana" },
  { id: 3, name: "Dawit" },
];

// Route: DELETE /students/:id
// Purpose: Find a student by id and remove them from the array.
app.delete("/students/:id", (req, res) => {
  // Convert the URL parameter (a string) to a number
  const id = Number(req.params.id);

  // Find the index of the student with the matching id
  const index = students.findIndex((student) => student.id === id);

  // If findIndex returns -1, the student does not exist
  if (index === -1) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  // Remove the student from the array using splice.
  // splice returns an array of removed items, so we take the first element.
  const deletedStudent = students.splice(index, 1)[0];

  // Respond with the deleted student details
  res.json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

// Route: GET /students
// Purpose: Return the current list of students (useful to verify deletions)
app.get("/students", (req, res) => {
  res.json(students);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
