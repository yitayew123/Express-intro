/**
 * Topic 2 — Request-Response Cycle (Multiple Middleware Chain)
 *
 * This file demonstrates:
 * 1. Chaining MULTIPLE middleware functions on the same path.
 * 2. The order in which they execute: 1 → 2 → route handler.
 * 3. Each middleware calling next() to hand control to the next one.
 * 4. How the final route handler sends the response.
 *
 * Execution order for GET /middleware/cycle:
 *   Request
 *     → Middleware 1  → logs "1. Request received"
 *     → Middleware 2  → logs "2. Middleware processing"
 *     → Route Handler → logs "3. Route handler executed" + sends response
 *   Response
 *
 * Why this matters:
 *   Real-world apps register several middleware in sequence for the same
 *   route — e.g., logger → authentication → authorization → rate limiter
 *   → validation → route handler. This file is the simplest possible
 *   demonstration of that chain.
 *
 * Pattern used: "Registrar function" (same as Topic 1)
 *   - The file exports a function that receives the Express `app`.
 *   - app.js activates it with one line: registerRequestResponseCycle(app);
 */

function registerRequestResponseCycle(app) {
  // ---------------------------------------------------------------
  // MIDDLEWARE 1 — runs FIRST on every request to /middleware/cycle
  // ---------------------------------------------------------------
  app.use("/middleware/cycle", (req, res, next) => {
    console.log("1. Request received");

    // Pass control to the next middleware in the chain
    next();
  });

  // ---------------------------------------------------------------
  // MIDDLEWARE 2 — runs SECOND (after Middleware 1 calls next())
  // ---------------------------------------------------------------
  app.use("/middleware/cycle", (req, res, next) => {
    console.log("2. Middleware processing");

    // Pass control to the route handler (it's next in the chain)
    next();
  });

  // ---------------------------------------------------------------
  // ROUTE HANDLER — runs LAST, sends the response
  // ---------------------------------------------------------------
  app.get("/middleware/cycle", (req, res) => {
    console.log("3. Route handler executed");

    res.send("Request-response cycle completed.");
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerRequestResponseCycle;
