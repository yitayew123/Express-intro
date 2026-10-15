/**
 * Student Update API (PUT & PATCH)
 *
 * This Express.js server demonstrates:
 * 1. Using URL parameters (:id) to identify a specific resource.
 * 2. PUT /students/:id  → Full replacement of editable fields (name, department).
 * 3. PATCH /students/:id → Partial update of only the provided fields.
 * 4. Validating request bodies and returning proper HTTP status codes (400, 404).
 * 5. Working with an in-memory array of student objects.
 */

const express = require("express");

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store with two pre-seeded students for testing
const students = [
  { id: 1, name: "Abebe", department: "IT" },
  { id: 2, name: "Hana", department: "Computer Science" },
];

// Route: PUT /students/:id
// Purpose: Replace the editable fields (name, department) of a student.
// Both fields are required; missing or invalid fields return 400.
app.put("/students/:id", (req, res) => {
  // Convert the URL parameter (a string) to a number
  const id = Number(req.params.id);

  // Find the student by id in the in-memory array
  const student = students.find((item) => item.id === id);

  // If no matching student is found, return 404
  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  // Extract name and department from the request body
  const { name, department } = req.body;

  // Validate that both fields are non-empty strings
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof department !== "string" ||
    !department.trim()
  ) {
    return res.status(400).json({
      error: "Name and department are required",
    });
  }

  // Replace the student's fields with the trimmed values
  student.name = name.trim();
  student.department = department.trim();

  // Return the updated student
  res.json({
    message: "Student replaced successfully",
    student,
  });
});

// Route: PATCH /students/:id
// Purpose: Update only the fields provided in the request body.
// At least one field must be provided; invalid values return 400.
app.patch("/students/:id", (req, res) => {
  // Convert the URL parameter to a number
  const id = Number(req.params.id);

  // Find the student by id
  const student = students.find((item) => item.id === id);

  // If no matching student is found, return 404
  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  // Extract name and department (both may be undefined)
  const { name, department } = req.body;

  // Ensure at least one field is provided for update
  if (name === undefined && department === undefined) {
    return res.status(400).json({
      error: "Provide at least one field to update",
    });
  }

  // If name is provided, validate it as a non-empty string
  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({
      error: "Name must be a non-empty string",
    });
  }

  // If department is provided, validate it as a non-empty string
  if (
    department !== undefined &&
    (typeof department !== "string" || !department.trim())
  ) {
    return res.status(400).json({
      error: "Department must be a non-empty string",
    });
  }

  // Apply updates only for the fields that were provided
  if (name !== undefined) {
    student.name = name.trim();
  }

  if (department !== undefined) {
    student.department = department.trim();
  }

  // Return the updated student
  res.json({
    message: "Student updated successfully",
    student,
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
