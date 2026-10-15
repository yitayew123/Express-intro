/**
 * Student Creation API
 *
 * A minimal Express.js server that:
 * 1. Accepts JSON request bodies.
 * 2. Exposes a POST /students endpoint to create new students.
 * 3. Validates required fields (name and department).
 * 4. Stores students in an in-memory array.
 * 5. Returns appropriate HTTP status codes and JSON responses.
 *
 * Note: Since data is stored in memory, all records are lost when the server restarts.
 */

const express = require("express");

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON request bodies
// Enables access to req.body in POST/PUT requests
app.use(express.json());

// In-memory data store for students
// Each student will have an auto-incremented id, name, and department
const students = [];

// Counter used to assign a unique id to each new student
let nextId = 1;

// Route: POST /students
// Purpose: Create a new student record from the request body
app.post("/students", (req, res) => {
  // Extract name and department from the parsed JSON body
  const { name, department } = req.body;

  // Validate that both fields are provided
  if (!name || !department) {
    return res.status(400).json({
      error: "Name and department are required",
    });
  }

  // Build the new student object with a unique id
  const student = {
    id: nextId++,
    name,
    department,
  };

  // Save the student to the in-memory array
  students.push(student);

  // Respond with 201 Created and the newly created student
  res.status(201).json({
    message: "Student created successfully",
    student,
  });
});

// Start the server on port 3000
// Logs a confirmation message once the server is running
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
