/**
 * Topic 9 — Middleware Execution Order (The Waterfall)
 *
 * This file demonstrates:
 * 1. The sequential nature of Express middleware (the "waterfall" effect).
 * 2. How Express walks down the stack of registered handlers in the exact order they appear in the file.
 * 3. The unusual but powerful pattern of a ROUTE HANDLER calling `next()`.
 * 4. How a final `app.use()` can act as a catch-all to finish the response.
 *
 * Execution order for GET /middleware/order:
 *   1. First middleware  → logs, calls next()
 *   2. Second middleware → logs, calls next()
 *   3. Route handler     → logs, calls next() (Note: it does NOT send a response!)
 *   4. Final handler     → logs, sends the response
 *
 * Why does the route handler call next()?
 *   Normally, a route handler sends a response (res.send/res.json) and stops.
 *   But if it wants to pass control to another handler (perhaps one registered later),
 *   it can call next(). Here, it acts as a bridge to the final handler.
 *
 * Pattern used: "Registrar function"
 */

function middlewareExecutionOrder(app) {
  // ---------------------------------------------------------------
  // 1. FIRST MIDDLEWARE
  // ---------------------------------------------------------------
  app.use("/middleware/order", (req, res, next) => {
    console.log("1. First middleware");
    next();
  });

  // ---------------------------------------------------------------
  // 2. SECOND MIDDLEWARE
  // ---------------------------------------------------------------
  app.use("/middleware/order", (req, res, next) => {
    console.log("2. Second middleware");
    next();
  });

  // ---------------------------------------------------------------
  // 3. ROUTE HANDLER (calls next!)
  // ---------------------------------------------------------------
  // Notice there is no `res.send()` here.
  // Because it calls `next()`, Express keeps looking down the stack.
  app.get("/middleware/order", (req, res, next) => {
    console.log("3. Route handler");
    next(); // Pass control to the next matching handler
  });

  // ---------------------------------------------------------------
  // 4. FINAL HANDLER (Catches the request and sends the response)
  // ---------------------------------------------------------------
  // This is registered AFTER the route handler. It only runs because
  // the route handler above called next().
  // We use app.use() here to catch any method (GET, POST, etc.).
  app.use("/middleware/order", (req, res) => {
    console.log("4. Final handler");
    res.send("Middleware execution order completed.");
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = middlewareExecutionOrder;
