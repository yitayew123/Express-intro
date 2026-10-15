/**
 * Student CRUD API with app.route() Chaining
 *
 * This Express.js server demonstrates:
 * 1. Grouping multiple HTTP methods for the same path using `app.route()`.
 * 2. Method chaining (.get(), .post(), .delete()) for cleaner route definitions.
 * 3. Using `express.json()` middleware to parse request bodies.
 * 4. Creating (POST) and Deleting (DELETE) resources with validation.
 * 5. Auto-incrementing IDs with a `nextId` counter.
 * 6. Returning proper HTTP status codes (200, 201, 400, 404).
 */

const express = require("express");

const app = express();

// Middleware to parse incoming JSON request bodies
// Required for POST requests so that `req.body` is populated
app.use(express.json());

// In-memory data store for students
let students = [
  { id: 1, name: "Abebe" },
  { id: 2, name: "Hana" },
];

// Counter used to assign a unique id to each new student
let nextId = 3;

// ============================================
// Route Group: /students
// Handles GET (list all) and POST (create new)
// ============================================
app
  .route("/students")
  // GET /students → Return the full list of students
  .get((req, res) => {
    res.json(students);
  })
  // POST /students → Create a new student
  .post((req, res) => {
    // Extract the name from the parsed JSON body
    const { name } = req.body;

    // Validate that name is a non-empty string
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        error: "Student name is required",
      });
    }

    // Build the new student object with a unique id
    const student = {
      id: nextId++,
      name: name.trim(),
    };

    // Add the new student to the array
    students.push(student);

    // Respond with 201 Created and the newly created student
    res.status(201).json(student);
  });

// ============================================
// Route Group: /students/:id
// Handles GET (one student) and DELETE (remove)
// ============================================
app
  .route("/students/:id")
  // GET /students/:id → Return a single student by id
  .get((req, res) => {
    const id = Number(req.params.id);

    const student = students.find((item) => item.id === id);

    // If no matching student is found, return 404
    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.json(student);
  })
  // DELETE /students/:id → Remove a student by id
  .delete((req, res) => {
    const id = Number(req.params.id);

    // Find the index of the student with the matching id
    const index = students.findIndex((item) => item.id === id);

    // If no match is found, findIndex returns -1
    if (index === -1) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    // Remove the student from the array using splice
    // splice returns an array of removed items, so we take the first element
    const deleted = students.splice(index, 1)[0];

    // Respond with the deleted student details
    res.json({
      message: "Student deleted",
      student: deleted,
    });
  });

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
