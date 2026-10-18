/**
 * Topic 12 — Custom Logging Middleware (Timing with res.on("finish"))
 *
 * This file demonstrates:
 * 1. Tracking the duration of a request.
 * 2. Using `res.on("finish", callback)` to execute code AFTER the response is sent.
 * 3. Logging structured data (method, URL, status, duration).
 * 4. Why we can't just log after `next()`.
 *
 * The Problem:
 *   If we log immediately after calling `next()`, the route handler hasn't
 *   executed yet, so `res.statusCode` might not be set, and we haven't
 *   measured how long the handler took.
 *
 * The Solution:
 *   We attach an event listener to the `res` (response) object. The "finish"
 *   event fires exactly when the response has been completely flushed to the
 *   client. Inside that callback, we calculate the time taken and log it.
 *
 * Pattern used: "Registrar function"
 */

function loggingMiddleware(app) {
  // ---------------------------------------------------------------
  // CUSTOM MIDDLEWARE: Request Timer & Logger
  // ---------------------------------------------------------------
  app.use("/middleware/logging", (req, res, next) => {
    // 1. Record the exact timestamp (in milliseconds) when the request started.
    const startTime = Date.now();

    // 2. Attach an event listener to the response object.
    // The callback runs asynchronously AFTER the route handler sends the response.
    res.on("finish", () => {
      // 3. Calculate the duration by subtracting the start time from the current time.
      const duration = Date.now() - startTime;

      // 4. Log a structured object containing useful request metadata.
      console.log({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode, // This is now safely populated (e.g., 200)
        durationMs: duration, // Time in milliseconds
      });
    });

    // 5. Pass control to the route handler immediately.
    // We do NOT wait for the response to finish here; that's the point of the event listener.
    next();
  });

  // ---------------------------------------------------------------
  // ROUTE HANDLER
  // ---------------------------------------------------------------
  app.get("/middleware/logging", (req, res) => {
    res.send("Request logging example completed.");
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = loggingMiddleware;
