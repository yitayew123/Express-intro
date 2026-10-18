/**
 * Topic 20 — Designing RESTful Endpoints (The API Blueprint)
 *
 * This file demonstrates:
 * 1. A comprehensive design pattern for a full RESTful resource.
 * 2. The standard mapping of CRUD operations to HTTP methods and URIs.
 * 3. API versioning (/api/v1) applied consistently across all endpoints.
 * 4. Returning a structured JSON document that acts as a "blueprint" for frontend developers.
 *
 * Why is this important?
 *   Before writing a single database query or controller function, you must
 *   design your endpoints. This endpoint acts as the specification. It tells
 *   the client exactly HOW to interact with the "students" resource.
 *
 * Pattern used: "Registrar function"
 */

function registerDesigningRESTfulEndpoints(app) {
  // ===============================================================
  // METADATA ENDPOINT: GET /endpoint-design
  // ===============================================================
  // This endpoint returns a blueprint of the API design.
  app.get("/endpoint-design", (req, res) => {
    res.json({
      // -----------------------------------------------------------
      // READ: Collection
      // -----------------------------------------------------------
      collection: {
        method: "GET",
        path: "/api/v1/students",
        purpose: "Retrieve the student collection",
      },

      // -----------------------------------------------------------
      // READ: Individual Resource
      // -----------------------------------------------------------
      individualResource: {
        method: "GET",
        path: "/api/v1/students/:id",
        purpose: "Retrieve one student",
      },

      // -----------------------------------------------------------
      // CREATE: Add to Collection
      // -----------------------------------------------------------
      create: {
        method: "POST",
        path: "/api/v1/students",
        purpose: "Create a student",
      },

      // -----------------------------------------------------------
      // UPDATE: Partial Modification (using PATCH)
      // -----------------------------------------------------------
      update: {
        method: "PATCH",
        path: "/api/v1/students/:id",
        purpose: "Partially update a student",
      },

      // -----------------------------------------------------------
      // DELETE: Remove Individual Resource
      // -----------------------------------------------------------
      delete: {
        method: "DELETE",
        path: "/api/v1/students/:id",
        purpose: "Delete a student",
      },
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerDesigningRESTfulEndpoints;
