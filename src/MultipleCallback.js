/**
 * Student Lookup API with Middleware Chaining
 *
 * This Express.js server demonstrates:
 * 1. Chaining multiple callback functions (middleware) on a single route.
 * 2. Using `next()` to pass control from one function to the next.
 * 3. Separating concerns: validation, data loading, and response handling.
 * 4. Attaching custom data to the `req` object (`req.student`) to share
 *    state between middleware functions.
 * 5. Returning appropriate HTTP error codes (400, 404) from middleware.
 *
 * Note: Express executes the callbacks in the order they are provided.
 * If a middleware sends a response, it must NOT call `next()`.
 */

const express = require("express");

const app = express();

// In-memory data store with two pre-seeded students
const students = [
  { id: 1, name: "Abebe" },
  { id: 2, name: "Hana" },
];

// Callback 1: Validate the identifier
// Purpose: Ensure the :id parameter is a positive integer before continuing.
function validateStudentId(req, res, next) {
  const id = Number(req.params.id);

  // Check if the id is a positive integer
  if (!Number.isInteger(id) || id <= 0) {
    // Stop the chain and send a 400 error
    return res.status(400).json({
      error: "Student ID must be a positive integer",
    });
  }

  // Validation passed; move to the next callback
  next();
}

// Callback 2: Find the student
// Purpose: Load the student from the array and attach it to the request object.
function loadStudent(req, res, next) {
  const id = Number(req.params.id);

  // Find the student and attach it to req.student for later use
  req.student = students.find((item) => item.id === id);

  // If no student is found, stop the chain with a 404 error
  if (!req.student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  // Student found; move to the next callback
  next();
}

// Callback 3: Send the response
// Purpose: Return the student that was loaded by the previous middleware.
function getStudent(req, res) {
  // req.student was set by loadStudent
  res.json(req.student);
}

// Execute callbacks in order
// Express runs: validateStudentId → loadStudent → getStudent
app.get("/students/:id", validateStudentId, loadStudent, getStudent);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
