/**
 * Basic Routing & Nested Parameters Demo
 *
 * This Express.js server demonstrates:
 * 1. Basic routing with multiple GET endpoints.
 * 2. Route parameters (`:id`) to capture dynamic values from the URL.
 * 3. Nested routes (e.g., /students/:id/courses) to represent relationships.
 * 4. Sending plain text responses using res.send().
 *
 * Note: This server only handles GET requests and does not parse JSON bodies,
 * so the express.json() middleware is not required.
 */

const express = require("express");

const app = express();

// Route: GET /
// Purpose: The root/home page of the application
app.get("/", (req, res) => {
  res.send("Home page");
});

// Route: GET /students
// Purpose: Returns a generic message for the students list
app.get("/students", (req, res) => {
  res.send("All students");
});

// Route: GET /students/:id
// Purpose: Returns a specific student based on the dynamic :id parameter
app.get("/students/:id", (req, res) => {
  // req.params.id extracts the value from the URL (e.g., "2" in /students/2)
  res.send(`Student ID: ${req.params.id}`);
});

// Route: GET /students/:id/courses
// Purpose: Returns courses for a specific student (nested resource)
// This shows how Express can handle deeper URL structures
app.get("/students/:id/courses", (req, res) => {
  res.send(`Courses for student ${req.params.id}`);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
