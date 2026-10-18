/**
 * Topic 15 — Static File Middleware (Serving HTML, CSS, and Images)
 *
 * This file demonstrates:
 * 1. Using the built-in `express.static()` middleware.
 * 2. Constructing absolute, safe file paths using Node's `path` module.
 * 3. Serving a whole directory of files (HTML, CSS, images) without writing routes.
 *
 * How `express.static()` works:
 *   - It takes a directory path.
 *   - It intercepts requests that match files in that directory.
 *   - If a file exists, it sends it with the correct MIME type (e.g., text/html, text/css).
 *   - If the file does not exist, it calls `next()` (usually resulting in a 404).
 *
 * The `__dirname` variable:
 *   - It is a Node.js global variable that returns the absolute path to the
 *     directory containing the CURRENT file.
 *   - Using `path.join(__dirname, "public")` ensures the path works on both
 *     Windows (C:\...) and Mac/Linux (/Users/...) without breaking.
 */

const path = require("path");
const express = require("express");

function staticFileMiddleware(app) {
  // Construct the absolute path to the "public" directory
  const publicDirectory = path.join(__dirname, "public");

  // Mount the static middleware.
  // The first argument ("/middleware/static") is the URL prefix.
  // The second argument is the physical folder to serve.
  // Example: A request to /middleware/static/style.css will load the
  // actual file from Middleware/public/style.css.
  app.use("/middleware/static", express.static(publicDirectory));
}

// Export the registrar function so app.js can call it with `app`
module.exports = staticFileMiddleware;
