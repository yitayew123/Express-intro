/**
 * Topic 4 — Application-Level Middleware (Prefix Matching)
 *
 * This file demonstrates:
 * 1. Binding middleware directly to the `app` instance (Application-level).
 * 2. How `app.use()` performs PREFIX MATCHING, unlike `app.get()` which is exact.
 * 3. Reusing one middleware for multiple different routes.
 * 4. Using `req.path` to see exactly which URL triggered the middleware.
 *
 * What is "Application-level" middleware?
 *   Middleware bound to `app` (e.g., app.use, app.get) applies to the whole application,
 *   as opposed to "Router-level" middleware bound to an express.Router() instance.
 *
 * The Magic of Prefix Matching:
 *   `app.use("/middleware/application", ...)` matches:
 *     - GET /middleware/application
 *     - GET /middleware/application/about
 *     - GET /middleware/application/anything/else
 *   It fires for ANY route that STARTS WITH that path.
 *
 *   `app.get("/middleware/application", ...)` only matches the EXACT path.
 *
 * Pattern used: "Registrar function" (same as previous topics)
 */

function applicationLevelMiddleware(app) {
  // ---------------------------------------------------------------
  // MIDDLEWARE — Applies to the base path AND all sub-paths
  // ---------------------------------------------------------------
  app.use("/middleware/application", (req, res, next) => {
    // req.path tells us exactly which URL was hit
    console.log("Application-level middleware fired for:", req.path);

    // Pass control to the specific route handler below
    next();
  });

  // ---------------------------------------------------------------
  // ROUTE 1 — Exact match for the base path
  // ---------------------------------------------------------------
  app.get("/middleware/application", (req, res) => {
    res.send("Application-level middleware: home route");
  });

  // ---------------------------------------------------------------
  // ROUTE 2 — Sub-path, but still caught by the app.use() above!
  // ---------------------------------------------------------------
  app.get("/middleware/application/about", (req, res) => {
    res.send("Application-level middleware: about route");
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = applicationLevelMiddleware;
