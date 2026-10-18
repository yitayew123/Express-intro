/**
 * Topic 19 — CRUD Operations (Mapping Actions to HTTP Methods)
 *
 * This file demonstrates:
 * 1. The universal language of data manipulation: CRUD.
 * 2. How CRUD maps directly to standard HTTP methods.
 * 3. A "documentation" endpoint that serves as a quick reference guide.
 *
 * What is CRUD?
 *   CRUD stands for Create, Read, Update, Delete.
 *   Almost every application ever built revolves around these four basic operations.
 *   REST maps these operations to specific HTTP verbs:
 *
 *   | Action | HTTP Method    | Typical URL              |
 *   |--------|----------------|--------------------------|
 *   | Create | POST           | /students                |
 *   | Read   | GET            | /students or /students/1 |
 *   | Update | PUT or PATCH   | /students/1              |
 *   | Delete | DELETE         | /students/1              |
 *
 * Pattern used: "Registrar function"
 */

function registerCRUDOperations(app) {
  // ===============================================================
  // METADATA ENDPOINT: GET /crud-demo
  // ===============================================================
  // This endpoint doesn't interact with a database. It simply returns
  // a JSON object documenting how REST and CRUD align.
  app.get("/crud-demo", (req, res) => {
    res.json({
      message: "CRUD operations in a REST API",
      operations: {
        // Create
        create: "POST /students",
        // Read
        read: "GET /students",
        // Update (Full replace vs Partial update)
        update: "PUT /students/:id or PATCH /students/:id",
        // Delete
        delete: "DELETE /students/:id",
      },
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerCRUDOperations;
