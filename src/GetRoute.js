/**
 * Student Management API
 *
 * A simple Express.js server that:
 * 1. Serves a list of students via a REST endpoint.
 * 2. Provides basic application information.
 * 3. Listens on port 3000.
 *
 * This file demonstrates how to define multiple routes,
 * work with in-memory data, and return JSON responses.
 */

const express = require("express");

// Create an Express application instance
const app = express();

// In-memory data store for students
// Each student has an id, name, and department
const students = [
  { id: 1, name: "Abebe", department: "IT" },
  { id: 2, name: "Hana", department: "Software Engineering" },
  { id: 3, name: "Dawit", department: "Computer Science" },
];

// Route: GET /students
// Purpose: Retrieve the full list of students as JSON
app.get("/students", (req, res) => {
  res.json(students);
});

// Route: GET /info
// Purpose: Return metadata about the application (name and version)
app.get("/info", (req, res) => {
  res.json({
    name: "Student Management API",
    version: "1.0.0",
  });
});

// Start the server on port 3000
// Logs a message once the server is running and ready to accept requests
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
