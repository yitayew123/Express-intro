/**
 * Topic 8 — Custom Middleware (Route-Specific Application)
 *
 * This file demonstrates:
 * 1. Writing your own custom middleware function (`addCourseInformation`).
 * 2. Applying middleware to a SPECIFIC route, rather than globally.
 * 3. How passing middleware as an argument to `app.get()` scopes it to that route only.
 * 4. Sharing custom data with the route handler via `req`.
 *
 * App-use vs. Route-specific middleware:
 *   - `app.use(middleware)` runs for EVERY request (or every request matching a path prefix).
 *   - `app.get("/path", middleware, handler)` runs the middleware ONLY for GET requests to that exact path.
 *
 * Why do it this way?
 *   It keeps the code clean. You don't need to write an `if (req.path === "/middleware/custom")`
 *   inside a global middleware. You just attach it right where it's needed.
 *
 * Pattern used: "Registrar function" (same as previous topics)
 */

function customMiddleware(app) {
  // ---------------------------------------------------------------
  // CUSTOM MIDDLEWARE FUNCTION
  // ---------------------------------------------------------------
  const addCourseInformation = (req, res, next) => {
    // Attach a custom object to the request.
    // This is completely made up by us—Express doesn't know what "courseInfo" means.
    req.courseInfo = {
      course: "Full-Stack Web Development",
      technology: "Express.js",
    };

    // Pass control to the route handler
    next();
  };

  // ---------------------------------------------------------------
  // ROUTE with INLINE MIDDLEWARE
  // ---------------------------------------------------------------
  // Notice that `addCourseInformation` is passed as the SECOND argument.
  // Express runs it before the final handler (the third argument).
  app.get(
    "/middleware/custom",
    addCourseInformation, // <--- Custom middleware applied ONLY to this route
    (req, res) => {
      res.json({
        message: "Custom middleware executed",
        courseInfo: req.courseInfo, // Read the data attached by the middleware
      });
    },
  );
}

// Export the registrar function so app.js can call it with `app`
module.exports = customMiddleware;
