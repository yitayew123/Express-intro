/**
 * Topic 13 — Authentication Middleware (Bearer Token Verification)
 *
 * This file demonstrates:
 * 1. How to read the `Authorization` header from a request.
 * 2. Verifying a "Bearer" token (the industry standard for API auth).
 * 3. Returning a 401 Unauthorized response if authentication fails.
 * 4. Attaching a verified user object to `req.user` for downstream routes.
 *
 * What is a Bearer Token?
 *   A Bearer token is an opaque string that acts as a "key" to the API.
 *   The client sends it in the header like this: `Authorization: Bearer <token>`.
 *   The word "Bearer" means "whoever bears (holds) this token is granted access."
 *
 * What is req.user?
 *   Once the token is verified, the middleware looks up the user in the database
 *   (simulated here with a hardcoded object) and attaches it to `req.user`.
 *   Every subsequent route handler in this request can now read `req.user`
 *   to know *who* is making the request, without decoding the token again.
 *
 * Pattern used: "Registrar function"
 */

function authenticationMiddleware(app) {
  // ---------------------------------------------------------------
  // CUSTOM MIDDLEWARE: authenticate
  // ---------------------------------------------------------------
  const authenticate = (req, res, next) => {
    // Extract the Authorization header
    const authorization = req.get("Authorization");

    // Check if the header exists AND matches the expected format.
    // Note: We check for the exact string "Bearer <token>".
    // In a real app, you would parse out the token and verify its signature (e.g., JWT).
    if (authorization !== "Bearer classroom-demo-token") {
      // Stop the chain and return 401 Unauthorized.
      // We return early so next() is never called.
      return res.status(401).json({
        error: "Authentication required.",
      });
    }

    // Authentication successful.
    // Attach the verified user's data to the request object.
    // In a real app, you would fetch this from a database using the user ID
    // encoded in the token.
    req.user = {
      id: 101,
      role: "student",
    };

    // Pass control to the actual route handler.
    next();
  };

  // ---------------------------------------------------------------
  // PROTECTED ROUTE
  // ---------------------------------------------------------------
  // The `authenticate` middleware runs first. If it fails, the route
  // handler below is NEVER executed.
  app.get("/middleware/authentication/profile", authenticate, (req, res) => {
    // We can safely read req.user here because authenticate added it.
    res.json({
      message: "Authentication successful",
      user: req.user,
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = authenticationMiddleware;
