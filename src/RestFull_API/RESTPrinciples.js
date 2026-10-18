/**
 * Topic 18 — REST Principles (Resource Identification & URI Design)
 *
 * This file demonstrates:
 * 1. How to identify a COLLECTION of resources in a RESTful URL.
 * 2. How to identify a SINGLE resource within that collection.
 * 3. The REST naming convention: URLs should be NOUNS (courses), not verbs (getCourses).
 *
 * The Golden Rule of REST URLs:
 *   URIs (URLs) are for IDENTIFYING things (Resources).
 *   HTTP Methods (GET, POST, PUT, DELETE) are for ACTING on those things.
 *
 * Examples:
 *   GET /courses      → Identifies the collection of all courses.
 *   GET /courses/5    → Identifies the specific course with ID 5.
 *   DELETE /courses/5 → Identifies the specific course, and the method says to delete it.
 *
 * Pattern used: "Registrar function"
 */

function registerRESTPrinciples(app) {
  // ===============================================================
  // 1. COLLECTION ENDPOINT
  // ===============================================================
  // The plural noun "courses" identifies the entire collection.
  // Notice we do NOT use verbs like "/getAllCourses".
  app.get("/rest-principles/courses", (req, res) => {
    res.json({
      resource: "courses",
      description: "This URL identifies the courses collection.",
    });
  });

  // ===============================================================
  // 2. INDIVIDUAL RESOURCE ENDPOINT
  // ===============================================================
  // Adding an ID (e.g., /courses/5) drills down into the collection
  // to identify one specific resource.
  app.get("/rest-principles/courses/:id", (req, res) => {
    res.json({
      resource: "course",
      id: req.params.id, // The dynamic ID from the URL
      description: "This URL identifies one course.",
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerRESTPrinciples;
