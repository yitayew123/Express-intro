/**
 * Student Filtering API (Query Parameters)
 *
 * This Express.js server demonstrates:
 * 1. Using query parameters (`req.query`) to filter data dynamically.
 * 2. Chaining array `.filter()` methods to apply multiple conditions.
 * 3. Making searches case-insensitive with `.toLowerCase()`.
 * 4. Using `.includes()` for partial string matching.
 *
 * Note: No express.json() middleware is needed since this only handles GET requests.
 */

const express = require("express");

const app = express();

// In-memory data store with three pre-seeded students
const students = [
  { id: 1, name: "Abebe", department: "IT" },
  { id: 2, name: "Hana", department: "Computer Science" },
  { id: 3, name: "Dawit", department: "IT" },
];

// Route: GET /students
// Purpose: Return a list of students, optionally filtered by department and/or name.
app.get("/students", (req, res) => {
  // Extract query parameters from the URL (e.g., ?department=IT&search=hana)
  const { department, search } = req.query;

  // Start with the full list of students
  let result = students;

  // Filter by department (if provided)
  if (department) {
    result = result.filter(
      (student) =>
        // Compare lowercase versions to make the filter case-insensitive
        student.department.toLowerCase() === String(department).toLowerCase(),
    );
  }

  // Filter by name search (if provided)
  if (search) {
    result = result.filter((student) =>
      // Check if the student's name contains the search term (case-insensitive)
      student.name.toLowerCase().includes(String(search).toLowerCase()),
    );
  }

  // Return the final filtered list as JSON
  res.json(result);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
