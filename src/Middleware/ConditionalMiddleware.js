/**
 * Topic 11 — Conditional Middleware (Route-Specific Authorization)
 *
 * This file demonstrates:
 * 1. Creating a custom middleware function that checks for an API key.
 * 2. Using `req.get()` to safely read HTTP request headers.
 * 3. Stopping the request cycle early by sending an error response (401 Unauthorized).
 * 4. Applying middleware CONDITIONALLY to only the routes that need it.
 *
 * Why this matters:
 *   Not every route should be protected. A "public" route should be accessible
 *   to anyone, while a "protected" route requires credentials. By passing the
 *   middleware function as an argument to `app.get()`, we apply the security
 *   check *only* to that specific route.
 *
 * Pattern used: "Registrar function"
 */

function conditionalMiddleware(app) {
  // ---------------------------------------------------------------
  // CUSTOM MIDDLEWARE: checkDemoKey
  // ---------------------------------------------------------------
  const checkDemoKey = (req, res, next) => {
    // req.get() performs a case-insensitive lookup for the given header.
    // E.g., it matches "X-API-Key", "x-api-key", or "X-Api-Key".
    const apiKey = req.get("X-API-Key");

    // If the key is missing or incorrect, STOP the request here.
    if (apiKey !== "classroom-demo-key") {
      // Sending a response terminates the request.
      // We return early so `next()` is never called.
      return res.status(401).json({
        error: "A valid demo API key is required.",
      });
    }

    // The key is valid. Allow the request to proceed to the route handler.
    next();
  };

  // ---------------------------------------------------------------
  // PUBLIC ROUTE — No middleware applied
  // ---------------------------------------------------------------
  app.get("/middleware/conditional/public", (req, res) => {
    res.send("This route is public.");
  });

  // ---------------------------------------------------------------
  // PROTECTED ROUTE — checkDemoKey is applied inline
  // ---------------------------------------------------------------
  app.get(
    "/middleware/conditional/protected",
    checkDemoKey, // <--- The conditional guard runs first
    (req, res) => {
      res.send("The demo API key was accepted.");
    },
  );
}

// Export the registrar function so app.js can call it with `app`
module.exports = conditionalMiddleware;
