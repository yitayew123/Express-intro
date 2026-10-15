/**
 * Student Registration API (POST Request)
 *
 * This Express.js server demonstrates:
 * 1. Using `express.json()` middleware to parse incoming JSON request bodies.
 * 2. Handling POST requests to create a new resource.
 * 3. Validating input data (checking for non-empty strings).
 * 4. Returning proper HTTP status codes: 201 (Created) and 400 (Bad Request).
 * 5. Trimming whitespace from user input using `.trim()`.
 *
 * Note: This example does NOT store the student in a database or array.
 * It simply validates the data and echoes it back. The `id` is hardcoded to 1.
 */

const express = require("express");

const app = express();

// Middleware to parse incoming JSON request bodies
// Required for POST requests so that `req.body` is populated
app.use(express.json());

// Route: POST /students
// Purpose: Register a new student with a name and department.
app.post("/students", (req, res) => {
  // Extract name and department from the parsed JSON body
  const { name, department } = req.body;

  // Validate that both fields are non-empty strings
  // - typeof check ensures it's a string (not a number, object, etc.)
  // - .trim() removes whitespace; !name.trim() catches empty/whitespace-only strings
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof department !== "string" ||
    !department.trim()
  ) {
    return res.status(400).json({
      error: "Valid name and department are required",
    });
  }

  // Build the new student object
  // Note: The id is hardcoded to 1 for this simple example
  const student = {
    id: 1,
    name: name.trim(),
    department: department.trim(),
  };

  // Respond with 201 Created and the newly created student
  res.status(201).json({
    message: "Student registered successfully",
    student,
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
