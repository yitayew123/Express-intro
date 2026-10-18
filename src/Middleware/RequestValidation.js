/**
 * Topic 14 — Request Validation (Input Sanitization & Error Aggregation)
 *
 * This file demonstrates:
 * 1. Validating the request body (name, email, department) BEFORE processing it.
 * 2. Aggregating multiple errors into an array (returning all errors at once, not just the first).
 * 3. Using Regular Expressions (Regex) to validate an email address format.
 * 4. Sanitizing input with `.trim()` to prevent whitespace-only data.
 * 5. Passing clean, validated data to the next handler via `req.validatedStudent`.
 *
 * Prerequisites:
 *   This route expects a JSON body. Therefore, `app.use(express.json())`
 *   (from Topic 5) MUST be active in your app.js for `req.body` to work.
 *
 * Why aggregate errors?
 *   If a user submits a form and gets an error for "name", fixes it, submits again,
 *   and gets an error for "email"... it's frustrating. It is much better UX to
 *   return ALL errors at once so the user can fix everything in one pass.
 *
 * Pattern used: "Registrar function"
 */

function requestValidation(app) {
  // ---------------------------------------------------------------
  // CUSTOM MIDDLEWARE: validateStudent
  // ---------------------------------------------------------------
  const validateStudent = (req, res, next) => {
    // Extract data from the request body
    const { name, email, department } = req.body;

    // Initialize an array to collect all validation errors
    const errors = [];

    // 1. Validate Name
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("Name is required.");
    }

    // 2. Validate Email
    // The regex checks for: characters + @ + characters + . + characters
    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.push("A valid email address is required.");
    }

    // 3. Validate Department
    if (typeof department !== "string" || department.trim() === "") {
      errors.push("Department is required.");
    }

    // If ANY errors were found, stop the request and return them all
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // ---------------------------------------------------------------
    // SANITIZATION
    // If we reach this point, all data is valid. We pass a new object
    // containing the cleaned (trimmed) values to the route handler.
    // This prevents accidental whitespace from being saved to a database.
    // ---------------------------------------------------------------
    req.validatedStudent = {
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
    };

    // Pass control to the final route handler
    next();
  };

  // ---------------------------------------------------------------
  // PROTECTED ROUTE (POST)
  // ---------------------------------------------------------------
  app.post("/middleware/validation/students", validateStudent, (req, res) => {
    // We safely use req.validatedStudent here, knowing it is clean and valid.
    res.status(201).json({
      message: "Student data validated successfully.",
      student: req.validatedStudent,
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = requestValidation;
