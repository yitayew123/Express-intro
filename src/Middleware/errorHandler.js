/**
 * Topic 26 (Updated) — Global Error Handler (Enterprise Edition)
 *
 * This file demonstrates:
 * 1. Creating an Express "Error-Handling Middleware" (4 arguments).
 * 2. Translating complex Mongoose/MongoDB errors into clean, user-friendly JSON.
 * 3. Catching EXPRESS BODY PARSER errors (e.g., malformed JSON).
 * 4. Preventing the server from crashing when an unexpected error occurs.
 *
 * Why must this be the LAST middleware in app.js?
 *   Express evaluates middleware top-to-bottom. If an error is thrown anywhere
 *   (in a route, in a controller, in another middleware), Express skips all
 *   normal routes and goes straight to the FIRST error-handling middleware it finds.
 */

function errorHandler(err, req, res, next) {
  // Log the raw error for debugging (this goes to your terminal, not the client)
  console.error("🔥 Error Caught:", err);

  // If the response has already started, delegate to the default Express handler
  if (res.headersSent) {
    return next(err);
  }

  // ===============================================================
  // 1. MONGODB DUPLICATE KEY ERROR (Code 11000)
  // ===============================================================
  // Triggered when a unique field (like `email` in our Student schema) is duplicated.
  if (err.code === 11000) {
    // Extract the field name that caused the duplicate
    const field = Object.keys(err.keyValue || {})[0] || "field";

    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists`,
    });
  }

  // ===============================================================
  // 2. MONGOOSE VALIDATION ERROR
  // ===============================================================
  // Triggered when a document fails the schema validation (e.g., missing name, year too high).
  if (err.name === "ValidationError") {
    // Convert the complex Mongoose error object into a simple array of strings
    const errors = Object.values(err.errors).map((item) => item.message);

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // ===============================================================
  // 3. MONGOOSE CAST ERROR
  // ===============================================================
  // Triggered when trying to find a document by an invalid ID format
  // (e.g., passing "abc" instead of a 24-character MongoDB ObjectId).
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for ${err.path}`,
    });
  }

  // ===============================================================
  // 4. EXPRESS BODY PARSER SYNTAX ERROR
  // ===============================================================
  // Triggered when a client sends malformed JSON (e.g., missing a closing brace).
  // `express.json()` throws a SyntaxError with a `body` property.
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON in request body. Please check your syntax.",
    });
  }

  // ===============================================================
  // 5. GENERAL MONGOOSE ERROR (e.g., connection dropped mid-request)
  // ===============================================================
  if (err.name === "MongooseError") {
    return res.status(503).json({
      success: false,
      message: "Database service temporarily unavailable. Please try again.",
    });
  }

  // ===============================================================
  // 6. FALLBACK: UNEXPECTED SERVER ERROR
  // ===============================================================
  // If the error doesn't match any known type, return a generic 500 error.
  // We do NOT expose the raw error message to the client for security reasons.
  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred",
  });
}

// Export the handler so it can be registered in app.js
module.exports = errorHandler;
