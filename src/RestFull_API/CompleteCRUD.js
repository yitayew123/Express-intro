/**
 * Topic 21 — Complete CRUD Implementation (Putting It All Together)
 *
 * This file demonstrates:
 * 1. A complete, production-ready implementation of all CRUD operations.
 * 2. Strict ID validation (ensuring IDs are positive integers).
 * 3. Strict input validation and sanitization.
 * 4. Advanced PATCH logic (validating allowed fields and preventing mass assignment).
 * 5. Proper HTTP status codes (200, 201, 204, 400, 404) and the Location header.
 */

function registerCompleteCRUD(app) {
  // Shared in-memory data store for this module
  const students = [
    { id: 1, name: "Abebe", department: "Software Engineering" },
    { id: 2, name: "Sara", department: "Computer Science" },
    { id: 3, name: "Dawit", department: "Information Technology" },
  ];

  let nextId = 3;

  // =================================================================
  // READ: Retrieve all students
  // =================================================================
  app.get("/crud-api/students", (req, res) => {
    res.status(200).json({
      count: students.length,
      data: students,
    });
  });

  // =================================================================
  // READ: Retrieve one student
  // =================================================================
  app.get("/crud-api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    // Strict Validation: Reject if not a positive integer (e.g., "abc", "-1", "1.5")
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid student ID." });
    }

    const student = students.find((item) => item.id === id);

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    res.status(200).json({ data: student });
  });

  // =================================================================
  // CREATE: Add a student
  // =================================================================
  app.post("/crud-api/students", (req, res) => {
    const { name, department } = req.body;

    // Validation
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof department !== "string" ||
      !department.trim()
    ) {
      return res.status(400).json({
        error: "Name and department are required.",
      });
    }

    const student = {
      id: nextId++,
      name: name.trim(),
      department: department.trim(),
    };

    students.push(student);

    // Advanced: Set the "Location" header to point to the newly created resource.
    // This is a REST best practice for 201 Created responses.
    res
      .status(201)
      .location(`/crud-api/students/${student.id}`)
      .json({ data: student });
  });

  // =================================================================
  // REPLACE: Full update (PUT)
  // =================================================================
  app.put("/crud-api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid student ID." });
    }

    const { name, department } = req.body;

    // PUT requires ALL fields, otherwise it's a bad request
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof department !== "string" ||
      !department.trim()
    ) {
      return res.status(400).json({
        error: "Name and department are required for PUT.",
      });
    }

    const index = students.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Completely replace the object, preserving only the ID
    students[index] = {
      id,
      name: name.trim(),
      department: department.trim(),
    };

    res.status(200).json({ data: students[index] });
  });

  // =================================================================
  // PARTIAL UPDATE: Update only supplied fields (PATCH)
  // =================================================================
  app.patch("/crud-api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid student ID." });
    }

    const student = students.find((item) => item.id === id);

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Advanced PATCH Logic:
    // 1. Get the keys the user is trying to update
    const fields = Object.keys(req.body);

    // 2. Define what fields ARE allowed to be updated
    const allowed = ["name", "department"];

    // 3. Reject if no fields provided, OR if they try to update something forbidden (like "id")
    if (
      fields.length === 0 ||
      fields.some((field) => !allowed.includes(field))
    ) {
      return res.status(400).json({
        error: "Provide name and/or department only.",
      });
    }

    // 4. Validate the newly provided values
    for (const field of fields) {
      if (typeof req.body[field] !== "string" || !req.body[field].trim()) {
        return res.status(400).json({
          error: `${field} must be a non-empty string.`,
        });
      }
    }

    // 5. Apply the updates
    for (const field of fields) {
      student[field] = req.body[field].trim();
    }

    res.status(200).json({ data: student });
  });

  // =================================================================
  // DELETE: Remove a student
  // =================================================================
  app.delete("/crud-api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid student ID." });
    }

    const index = students.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Student not found." });
    }

    students.splice(index, 1);

    // 204 No Content: Success, but there is no body to return.
    res.status(204).end();
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerCompleteCRUD;
