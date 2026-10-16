// Route Organization Example:
// /**
//  * Student Router Module
//  *
//  * This file demonstrates:
//  * 1. Using `express.Router()` to create a modular, mountable router.
//  * 2. Defining routes on the router instead of the app directly.
//  * 3. Exporting the router with `module.exports` so it can be mounted elsewhere.
//  * 4. Keeping route definitions separate from server setup (separation of concerns).
//  *
//  * Important: This file does NOT start a server and does NOT define `app.listen()`.
//  * It must be imported and mounted inside a main server file (e.g., app.js).
//  * Route paths here are RELATIVE to the mount point.
//  *   - router.get("/")     → becomes GET /students (if mounted at /students)
//  *   - router.get("/:id")  → becomes GET /students/:id
//  *
//  * Note: No express.json() middleware is needed here because this router
//  * only handles GET requests (no request body to parse).
//  */

// const express = require("express");

// // Create a router instance to define routes in a modular way
// const router = express.Router();

// // In-memory data store with two pre-seeded students
// const students = [
//   { id: 1, name: "Abebe" },
//   { id: 2, name: "Hana" },
// ];

// // Route: GET / (relative to mount point)
// // If mounted at "/students", this responds to GET /students
// router.get("/", (req, res) => {
//   res.json(students);
// });

// // Route: GET /:id (relative to mount point)
// // If mounted at "/students", this responds to GET /students/:id
// router.get("/:id", (req, res) => {
//   const id = Number(req.params.id);

//   // Find the student with the matching id
//   const student = students.find((item) => item.id === id);

//   // If no match is found, return 404
//   if (!student) {
//     return res.status(404).json({
//       error: "Student not found",
//     });
//   }

//   res.json(student);
// });

// // Export the router so it can be imported and mounted in the main app
// module.exports = router;


// Route prefix Example:

/**
 * Student Router Module (Version 1)
 *
 * This file demonstrates:
 * 1. Defining routes on an Express Router (no app.listen here).
 * 2. Using relative paths that will be prefixed when mounted.
 * 3. Returning simple JSON responses (mock data, no in-memory store yet).
 * 4. Including a `version` field in responses to show which API version served them.
 *
 * Note: The paths here are RELATIVE. They only become full URLs
 * after the router is mounted in app.js with a prefix.
 */

const express = require("express");

// Create a router instance
const router = express.Router();

// Route: GET / (relative)
// When mounted at /api/v1/students, this responds to GET /api/v1/students
router.get("/", (req, res) => {
  res.json({
    message: "All students",
    version: "v1"
  });
});

// Route: GET /:id (relative)
// When mounted at /api/v1/students, this responds to GET /api/v1/students/:id
router.get("/:id", (req, res) => {
  res.json({
    message: "Student details",
    studentId: req.params.id,  // Echoes back the URL parameter
    version: "v1"
  });
});

// Export the router so it can be mounted in the main app
module.exports = router;