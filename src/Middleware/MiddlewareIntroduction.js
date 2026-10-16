/**
 * Topic 1 — Introduction to Middleware (Request Lifecycle Demo)
 *
 * This file demonstrates:
 * 1. What middleware is and where it fits in Express's request lifecycle.
 * 2. Registering path-scoped middleware with `app.use(path, fn)`.
 * 3. Inspecting the request object (`req.method`, `req.originalUrl`).
 * 4. Calling `next()` to hand control to the next handler.
 * 5. The order of execution: middleware → route handler → response.
 *
 * Request lifecycle (as shown by this file):
 *   Client → Middleware ("1. Middleware executed") → Route Handler ("2. Route handler executed") → Response
 *
 * Pattern used: "Registrar function"
 *   - The module exports a function that receives the Express `app`.
 *   - This keeps middleware configuration self-contained and reusable.
 *   - app.js only needs one line to activate it: registerMiddlewareIntroduction(app);
 */

function registerMiddlewareIntroduction(app) {
  // ---------------------------------------------------------------
  // MIDDLEWARE — runs FIRST, before the route handler below
  // Scoped to "/middleware/introduction" only; other URLs skip it.
  // ---------------------------------------------------------------
  app.use("/middleware/introduction", (req, res, next) => {
    console.log("1. Middleware executed");
    console.log("HTTP Method:", req.method);
    console.log("Requested URL:", req.originalUrl);

    // Pass control to the next matching handler.
    // Without next(), the request would hang here forever.
    next();
  });

  // ---------------------------------------------------------------
  // ROUTE HANDLER — runs SECOND, only after middleware calls next()
  // Sends the final response to the client.
  // ---------------------------------------------------------------
  app.get("/middleware/introduction", (req, res) => {
    console.log("2. Route handler executed");

    res.send("Welcome to Express Middleware!");
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerMiddlewareIntroduction;
