/**
 * Topic 17 — Introduction to REST (API Structure & Versioning)
 *
 * This file demonstrates:
 * 1. The basic structure of a RESTful API using the standard HTTP verbs.
 * 2. Using API versioning in the URL path (e.g., /api/v1).
 * 3. A "Root" endpoint that describes the API and its available operations.
 * 4. A "Collection" endpoint that returns a list of resources (students).
 *
 * What is REST?
 *   REST is an architectural style for designing networked applications.
 *   In a RESTful API, everything is a "Resource" (like a student, a course, or an enrollment).
 *   You interact with resources using standard HTTP methods:
 *     - GET    → Read
 *     - POST   → Create
 *     - PUT    → Update/Replace
 *     - PATCH  → Partial Update
 *     - DELETE → Remove
 *
 * Pattern used: "Registrar function"
 */

function registerIntroductionToREST(app) {
  // ===============================================================
  // ROOT ENDPOINT: GET /api/v1
  // ===============================================================
  // This is a demonstration endpoint that acts as the "front door"
  // to the API. It tells the client what the API is and what it can do.
  app.get("/api/v1", (req, res) => {
    res.status(200).json({
      message: "Welcome to the Student REST API",
      description: "This API demonstrates REST architecture using Express.js.",
      resource: "students",
      availableOperations: [
        "GET - Retrieve resources",
        "POST - Create resources",
        "PUT - Replace resources",
        "PATCH - Partially update resources",
        "DELETE - Remove resources",
      ],
    });
  });

  // ===============================================================
  // COLLECTION ENDPOINT: GET /api/v1/students
  // ===============================================================
  // In REST, a "collection" refers to the list of all resources.
  // This endpoint returns a hardcoded array of students for demonstration.
  app.get("/api/v1/students", (req, res) => {
    res.status(200).json({
      message: "Student collection endpoint",
      students: [
        {
          id: 1,
          name: "Abebe",
          department: "Software Engineering",
        },
        {
          id: 2,
          name: "Sara",
          department: "Computer Science",
        },
      ],
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerIntroductionToREST;
