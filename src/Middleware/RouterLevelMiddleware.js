/**
 * Topic 6 — Router-Level Middleware (Modular Isolation)
 *
 * This file demonstrates:
 * 1. Creating a modular router with `express.Router()`.
 * 2. Applying middleware directly to the router using `router.use()`.
 * 3. Scoping middleware so it ONLY runs for routes on this specific router.
 * 4. Exporting the router (not a registrar function) to be mounted in app.js.
 *
 * Application vs. Router-Level Middleware:
 *   - Application-level (Topic 4): `app.use()` affects the whole app.
 *   - Router-level (Topic 6): `router.use()` affects ONLY the routes defined
 *     on this specific router instance. It does not affect other routers.
 *
 * How this is mounted in app.js:
 *   app.use("/middleware/router-level", router);
 *   This means the router's "/" becomes "/middleware/router-level".
 */

const express = require("express");

// Create a dedicated router instance for this topic
const router = express.Router();

// ---------------------------------------------------------------
// ROUTER-LEVEL MIDDLEWARE
// Runs for EVERY request handled by this router (regardless of path).
// It will NOT run for routes on other routers or the main app.
// ---------------------------------------------------------------
router.use((req, res, next) => {
  console.log("Router-level middleware executed");
  next();
});

// ---------------------------------------------------------------
// ROUTES — Only these routes trigger the middleware above
// ---------------------------------------------------------------
router.get("/", (req, res) => {
  res.send("Router-level middleware home page");
});

router.get("/:id", (req, res) => {
  res.json({
    message: "Router-level middleware: student details",
    studentId: req.params.id,
  });
});

// Export the router instance (Not a registrar function like previous topics)
module.exports = router;
