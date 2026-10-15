/**
 * Enrollment Lookup API (Multiple Route Parameters)
 *
 * This Express.js server demonstrates:
 * 1. Using multiple URL parameters in a single route (:studentId and :courseId).
 * 2. Combining conditions inside `.find()` to match two criteria simultaneously.
 * 3. Returning a 404 status when no matching record is found.
 * 4. Sending a JSON response for a specific enrollment.
 *
 * Note: No express.json() middleware is needed since this only handles GET requests.
 */

const express = require("express");

const app = express();

// In-memory data store representing student-course enrollments
const enrollments = [
  {
    studentId: 10,
    courseId: 5,
    courseName: "Web Development",
  },
  {
    studentId: 10,
    courseId: 8,
    courseName: "Database Systems",
  },
  {
    studentId: 20,
    courseId: 5,
    courseName: "Web Development",
  },
];

// Route: GET /students/:studentId/courses/:courseId
// Purpose: Retrieve a specific enrollment record based on both student and course IDs.
app.get("/students/:studentId/courses/:courseId", (req, res) => {
  // Extract and convert both URL parameters from strings to numbers
  const studentId = Number(req.params.studentId);
  const courseId = Number(req.params.courseId);

  // Find the enrollment that matches BOTH the studentId AND the courseId
  const enrollment = enrollments.find(
    (item) => item.studentId === studentId && item.courseId === courseId,
  );

  // If no matching enrollment exists, return 404 Not Found
  if (!enrollment) {
    return res.status(404).json({
      error: "Enrollment not found",
    });
  }

  // Return the matching enrollment record as JSON
  res.json(enrollment);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
