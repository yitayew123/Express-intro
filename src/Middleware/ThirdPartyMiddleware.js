/**
 * Topic 7 — Third-Party Middleware (Logging & Security)
 *
 * This file demonstrates:
 * 1. How to integrate third-party middleware packages into Express.
 * 2. Using `morgan` to automatically log incoming HTTP requests to the terminal.
 * 3. Using `helmet` to automatically add security-related HTTP headers to responses.
 * 4. Why Express is minimal by default and relies on third-party packages for
 *    standard production features (logging, security, CORS, etc.).
 *
 * Prerequisites:
 *   Run `npm install morgan helmet` in your project folder before starting the server.
 */

// Import the third-party packages
const morgan = require("morgan");
const helmet = require("helmet");

function thirdPartyMiddleware(app) {
  // ---------------------------------------------------------------
  // THIRD-PARTY MIDDLEWARE
  // ---------------------------------------------------------------

  // Morgan: Logs every request to the terminal (e.g., GET /path 200 5ms)
  // 'dev' is a pre-defined format that provides concise, color-coded output.
  app.use(morgan("dev"));

  // Helmet: Automatically sets various HTTP headers to help protect the app
  // from well-known web vulnerabilities (like XSS, clickjacking, etc.).
  app.use(helmet());

  // ---------------------------------------------------------------
  // ROUTE
  // ---------------------------------------------------------------
  app.get("/middleware/third-party", (req, res) => {
    res.json({
      message: "Third-party middleware demonstration",
      logger: "Morgan logs requests in the terminal",
      security: "Helmet adds security-related HTTP headers",
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = thirdPartyMiddleware;
