/**
 * Topic 3 — Middleware Parameters (Attaching Data to `req`)
 *
 * This file demonstrates:
 * 1. Creating a custom property on the request object (`req.requestInfo`).
 * 2. Populating it inside middleware so downstream handlers can use it.
 * 3. Reading that custom property inside the route handler.
 * 4. Sharing state between middleware and routes — a core Express pattern.
 *
 * Execution order for GET /middleware/parameters:
 *   Request
 *     → Middleware   → builds req.requestInfo (method, path, timestamp)
 *     → Route handler → reads req.requestInfo and sends it as JSON
 *   Response
 *
 * Why this matters:
 *   The `req` object is the "shared envelope" that travels with a request.
 *   Any middleware can attach data (auth user, parsed token, timing info,
 *   language, tenant ID, etc.) and later handlers can read it.
 *
 *   Real-world examples of things middleware typically attach to `req`:
 *     - req.user       → authenticated user (from a JWT/session)
 *     - req.startTime  → used to measure request duration
 *     - req.tenant     → multi-tenant apps use this to select the DB
 *     - req.requestId  → correlation ID for logging / tracing
 *
 * Pattern used: "Registrar function" (same as Topics 1 & 2)
 *   - The file exports a function that receives the Express `app`.
 *   - app.js activates it with one line: registerMiddlewareParameters(app);
 *
 * Note: `req.requestInfo` is a custom property — it does NOT exist on
 * Express's default req object. We create it and later read it.
 */

function registerMiddlewareParameters(app) {
  // ---------------------------------------------------------------
  // MIDDLEWARE — runs FIRST, enriches the request with custom data
  // ---------------------------------------------------------------
  app.use("/middleware/parameters", (req, res, next) => {
    // Attach a plain object with useful request metadata.
    // Because `req` is a shared reference for this request's lifecycle,
    // the route handler below will see exactly what we set here.
    req.requestInfo = {
      method: req.method, // e.g. "GET"
      path: req.path, // e.g. "/middleware/parameters"
      receivedAt: new Date().toISOString(), // ISO-8601 timestamp
    };

    // Pass control to the next handler
    next();
  });

  // ---------------------------------------------------------------
  // ROUTE HANDLER — runs SECOND, reads the data attached above
  // ---------------------------------------------------------------
  app.get("/middleware/parameters", (req, res) => {
    res.json({
      message: "Request information added by middleware",
      // req.requestInfo was created by the middleware above
      requestInfo: req.requestInfo,
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerMiddlewareParameters;
