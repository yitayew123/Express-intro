/**
 * Topic 10 — The `next()` Function (Standard vs. `next("route")`)
 *
 * This file demonstrates:
 * 1. The standard `next()` — passes control to the next handler in the stack.
 * 2. The special `next("route")` — aborts the CURRENT route and jumps to the
 *    next matching ROUTE.
 * 3. How to conditionally skip route callbacks.
 *
 * The Difference:
 *   - `next()`        → "Go to the next function in this exact route/stack."
 *   - `next("route")` → "I'm done with this route entirely. Skip any remaining
 *                        callbacks in this app.get(), and look for the NEXT
 *                        matching route definition below."
 *
 * Pattern used: "Registrar function"
 */

function nextFunction(app) {
  // ===============================================================
  // PART 1: Standard `next()` (Chaining within the same route)
  // ===============================================================
  app.use("/middleware/next", (req, res, next) => {
    console.log("First handler");
    next(); // Moves to the next handler
  });

  app.get("/middleware/next", (req, res, next) => {
    console.log("Second handler");
    next(); // Moves to the next handler
  });

  app.use("/middleware/next", (req, res) => {
    res.send("Control passed through all handlers.");
  });

  // ===============================================================
  // PART 2: `next("route")` (Skipping the rest of a specific route)
  // ===============================================================

  // Here we define a route with TWO callbacks.
  app.get(
    "/middleware/next-route",
    (req, res, next) => {
      console.log("Skipping the remaining callbacks for this route");
      // This tells Express: "Stop executing callbacks for this specific
      // app.get() and jump to the next app.get() that matches this URL."
      next("route");
    },
    (req, res) => {
      // This callback is COMPLETELY SKIPPED because of next("route") above.
      res.send("This response will not be sent.");
    },
  );

  // Because next("route") was called above, Express looks for the NEXT
  // matching route definition and runs this one.
  app.get("/middleware/next-route", (req, res) => {
    res.send("The next matching route handled the request.");
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = nextFunction;
