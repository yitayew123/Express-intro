/**
 * Single Student Retrieval API
 *
 * This Express.js server demonstrates:
 * 1. Using a URL parameter (:id) to fetch a specific resource.
 * 2. Converting a URL parameter (string) to a number for comparison.
 * 3. Using the array `.find()` method to locate an item by id.
 * 4. Returning a 404 status when the requested resource does not exist.
 * 5. Sending a JSON response with the found student.
 *
 * Note: No express.json() middleware is needed since this only handles GET requests.
 */

const express = require("express");

const app = express();

// In-memory data store with three pre-seeded students
const students = [
  { id: 1, name: "Abebe" },
  { id: 2, name: "Hana" },
  { id: 3, name: "Dawit" },
];

// Route: GET /students/:id
// Purpose: Retrieve a single student by their unique id.
app.get("/students/:id", (req, res) => {
  // Convert the URL parameter from a string to a number
  const id = Number(req.params.id);

  // Search the array for a student with a matching id
  const student = students.find((item) => item.id === id);

  // If no student matches the id, return a 404 Not Found response
  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  // Return the found student as JSON
  res.json(student);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
