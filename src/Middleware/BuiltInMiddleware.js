/**
 * Topic 5 — Built-in Middleware (Body Parsing)
 *
 * This file demonstrates:
 * 1. Using Express's built-in middleware for parsing request bodies.
 * 2. `express.json()` for parsing application/json (e.g., Postman raw JSON).
 * 3. `express.urlencoded()` for parsing application/x-www-form-urlencoded (HTML forms).
 * 4. Accessing the parsed data via `req.body`.
 *
 * Why are these needed?
 *   Incoming HTTP requests are just a stream of raw bytes.
 *   Express does NOT parse the body by default. If you try to read `req.body`
 *   without these middleware, it will be `undefined`.
 *   These built-in functions intercept the request, read the raw stream,
 *   convert it into a JavaScript object, and attach it to `req.body`.
 *
 * Pattern used: "Registrar function" (same as previous topics)
 */

// We need to import express to access the built-in middleware functions
const express = require("express");

function builtInMiddleware(app) {
  // ---------------------------------------------------------------
  // BUILT-IN MIDDLEWARE — MUST be registered BEFORE the routes
  // ---------------------------------------------------------------

  // 1. Parses incoming JSON bodies (Content-Type: application/json)
  // Attaches the parsed object to req.body
  app.use(express.json());

  // 2. Parses incoming URL-encoded bodies (Content-Type: application/x-www-form-urlencoded)
  // `extended: true` allows for rich objects and arrays to be encoded into the URL-encoded format
  app.use(express.urlencoded({ extended: true }));

  // ---------------------------------------------------------------
  // ROUTES — These now have access to req.body
  // ---------------------------------------------------------------

  app.post("/middleware/built-in/json", (req, res) => {
    res.json({
      message: "JSON body parsed successfully",
      // req.body is now populated by express.json()
      receivedData: req.body,
    });
  });

  app.post("/middleware/built-in/form", (req, res) => {
    res.json({
      message: "Form body parsed successfully",
      // req.body is now populated by express.urlencoded()
      receivedData: req.body,
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = builtInMiddleware;
