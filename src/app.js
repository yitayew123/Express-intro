// const express = require("express");

// // Create the application
// const app = express();

// // Define the home route
// app.get("/", (req, res) => {
//   res.send("Welcome to my first Express application!");
// });

// // Define an about route
// app.get("/about", (req, res) => {
//   res.send("This application was created by students.");
// });

// // Define an API route
// app.get("/api/info", (req, res) => {
//   res.json({
//     application: "Express Introduction",
//     version: "1.0.0",
//     status: "running"
//   });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });

// Route Organization Example:
// /**
//  * Express Application Entry Point (Main Server)
//  *
//  * This file is the starting point of the application. It:
//  * 1. Creates the Express application instance.
//  * 2. Imports the modular student router.
//  * 3. Mounts the router at a specific base path (/students).
//  * 4. Starts the server on port 3000.
//  *
//  * Note: This file does NOT define any routes directly.
//  * All student-related routes live inside ./routes/studentRoutes.js.
//  * This separation of concerns keeps the codebase clean and scalable.
//  */

// const express = require("express");

// // Create the Express application instance
// const app = express();

// // Import the student router module
// // This contains all routes related to students (GET, POST, etc.)
// const studentRoutes = require("./routes/studentRoutes");

// // Mount the router at the /students base path.
// // All routes defined inside studentRoutes are now relative to /students.
// //   - router.get("/")     → becomes GET /students
// //   - router.get("/:id")  → becomes GET /students/:id
// app.use("/students", studentRoutes);

// // Start the server on port 3000
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// // Route prefix Example:
// /**
//  * Express Application Entry Point with Versioned API Prefix
//  *
//  * This file demonstrates:
//  * 1. Creating the Express app instance.
//  * 2. Importing the student router module.
//  * 3. Mounting the router under a VERSIONED prefix: /api/v1/students.
//  * 4. Starting the server on port 3000.
//  *
//  * Why versioning? API versioning (/api/v1/, /api/v2/) lets you release
//  * breaking changes without breaking existing clients. Old clients keep
//  * using /api/v1 while new clients use /api/v2 — both can coexist.
//  *
//  * Mounting logic:
//  *   router.get("/")     →  GET /api/v1/students
//  *   router.get("/:id")  →  GET /api/v1/students/:id
//  */

// const express = require("express");

// // Create the Express application instance
// const app = express();

// // Import the student router module
// const studentRoutes = require("./routes/studentRoutes");

// // Mount the router under a versioned API prefix
// // All routes inside the router are now prefixed with /api/v1/students
// app.use("/api/v1/students", studentRoutes);

// // Start the server on port 3000
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// ===============================================Middleware Example:=============================

// const express = require("express");

// const app = express();
// const PORT = 3000;

// // Import Topic 1: Introduction to Middleware
// const registerMiddlewareIntroduction = require("./Middleware/MiddlewareIntroduction");

// // Import Topic 2: Request-Response Cycle (Multiple Middleware Chain)
// const registerRequestResponseCycle = require("./Middleware/RequestResponseCycle");

// // Import Topic 3: Middleware Parameters (Attaching Data to `req`)
// const registerMiddlewareParameters = require("./Middleware/MiddlewareParameters");

// // Import Topic 4: Application-Level Middleware (Prefix Matching)
// const registerApplicationLevelMiddleware = require("./Middleware/ApplicationLevelMiddleware");

// // Import Topic 5: Built-in Middleware (Body Parsing)
// const registerBuiltInMiddleware = require("./Middleware/BuiltInMiddleware");

// // Import Topic 6: Router-Level Middleware (Modular Isolation)
// const routerLevelMiddleware = require("./Middleware/RouterLevelMiddleware");
// // // Mount the router at a specific path
// app.use("/middleware/router-level", routerLevelMiddleware);

// // Import Topic 7: Third-Party Middleware (Logging & Security)
// const thirdPartyMiddleware = require("./Middleware/ThirdPartyMiddleware");

// // Import Topic 8: Custom Middleware (Route-Specific Application)
// const customMiddleware = require("./Middleware/CustomMiddleware");

// // Import Topic 9: Middleware Execution Order (The Waterfall)
// const middlewareExecutionOrder = require("./Middleware/MiddlewareExecutionOrder");

// // Import Topic 10: `next()` vs `next("route")` (Conditional Skipping)
// const nextFunction = require("./Middleware/NextFunction");

// // Import Topic 11: Conditional Middleware (Route-Specific Authorization)
// const conditionalMiddleware = require("./Middleware/ConditionalMiddleware");

// // Import Topic 12: Custom Logging Middleware (Timing with res.on("finish"))
// const loggingMiddleware = require("./Middleware/LoggingMiddleware");

// // Import Topic 13: Authentication Middleware (Bearer Token Verification)
// const authenticationMiddleware = require("./Middleware/AuthenticationMiddleware");

// // Import Topic 14: Request Validation (Input Sanitization & Error Aggregation)
// const requestValidation = require("./Middleware/RequestValidation");

// // Import Topic 15: Static File Middleware (Serving HTML, CSS, and Images)
// const staticFileMiddleware = require("./Middleware/StaticFileMiddleware");

// // Register Topic 1
// registerMiddlewareIntroduction(app);

// // Register Topic 2
// registerRequestResponseCycle(app);

// // Register Topic 3
// registerMiddlewareParameters(app);

// // Register Topic 4
// registerApplicationLevelMiddleware(app);

// // Register Topic 5
// registerBuiltInMiddleware(app);

// // Register Topic 6
// // Mount the router-level middleware at a specific path
// // All routes defined in routerLevelMiddleware are now prefixed with /middleware/router-level
// app.use("/middleware/router-level", routerLevelMiddleware);

// // Register Topic 7
// thirdPartyMiddleware(app);

// // Register Topic 8
// customMiddleware(app);

// // Register Topic 9
// middlewareExecutionOrder(app);

// // Register Topic 10
// nextFunction(app);

// // Register Topic 11
// conditionalMiddleware(app);

// // Register Topic 12
// loggingMiddleware(app);
// // Register Topic 13
// authenticationMiddleware(app);

// // Register Topic 14
// requestValidation(app);

// // Register Topic 15
// staticFileMiddleware(app);

// // Define a catch-all route for undefined paths (404 Not Found)
// app.use((req, res) => {
//   res.status(404).send("404 Not Found: The requested resource does not exist.");
// });

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// // ==============================================Controller Example:=============================

// /**
//  * Main Server File — Full CRUD with MVC Architecture
//  *
//  * This file demonstrates:
//  * 1. Wiring the controller and router into the main app.
//  * 2. Using a versioned/routing prefix ("/routing-demo/students").
//  * 3. A global 404 catch-all handler (crucial for clean API responses).
//  */

// const express = require("express");

// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON bodies (Required for POST, PUT, PATCH)
// app.use(express.json());

// // =================================================================
// // MOUNT ROUTES
// // =================================================================
// const studentRoutes = require("./routes/studentRoutes");

// // Mount the router at the prefix
// app.use("/routing-demo/students", studentRoutes);

// // =================================================================
// // 404 CATCH-ALL HANDLER
// // =================================================================
// // If a request makes it this far, it means no route above matched.
// // Instead of Express's default HTML 404 page, we send a clean JSON 404.
// // Note: This MUST be placed AFTER all other routes.
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // =================================================================
// // START SERVER
// // =================================================================
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// ============================================Restfull API Example:=============================
require("dotenv").config(); // 👈 Load environment variables FIRST
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/db"); // 👈 Import the DB connection

const app = express();
const PORT = 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Import Module 6, Topic 1
const registerIntroductionToREST = require("./RestFull_API/IntroductionToREST");

// Import Module 6, Topic 2
const registerRESTPrinciples = require("./RestFull_API/RESTPrinciples");

// Import Module 6, Topic 3
const registerCRUDOperations = require("./RestFull_API/CRUDOperations");

// Import Module 6, Topic 4
const registerDesigningRESTfulEndpoints = require("./RestFull_API/DesigningRESTfulEndpoints");

// Import Module 6, Topic 5
const registerCompleteCRUD = require("./RestFull_API/CompleteCRUD");

// Import Module 6, Topic 6
const registerSortingPagination = require("./RestFull_API/SortingPagination");

// Import the global error handler (must be the VERY LAST middleware)
const errorHandler = require("./Middleware/errorHandler");

// Mount the global error handler (must be the VERY LAST middleware)
app.use(errorHandler);

// =================================================================
// 3. SWAGGER DOCUMENTATION
// =================================================================
// Import the parsed OpenAPI configuration object (from your YAML/JS file)
const openApiDocument = require("./API_Management/swaggerConfig");

// Mount the Swagger UI.
// `swaggerUi.serve` serves the static HTML/CSS/JS files for the UI.
// `swaggerUi.setup(document)` injects your API specification into the UI.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// =================================================================
// 4. 404 CATCH-ALL HANDLER
// =================================================================
// If a request reaches this point, it means no API route matched,
// AND it's not a request for the Swagger UI.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Register Topic 1
registerIntroductionToREST(app);

// Register Topic 2
registerRESTPrinciples(app);

// Register Topic 3
registerCRUDOperations(app);

// Register Topic 4
registerDesigningRESTfulEndpoints(app);

// Register Topic 5
registerCompleteCRUD(app);

// Register Topic 6
registerSortingPagination(app);

// ==============================================================================
// 5. DATABASE CONNECTION & SERVER STARTUP
// ==============================================================================
// We connect to the database first. Only if that succeeds do we start the server.
// This ensures that the server doesn't run in a broken state without DB access.
// 1. Connect to Database
// ✅ CORRECT: Wait for DB before starting the server
connectDB()
  .then(() => {
    // This ONLY runs if the DB connects successfully
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    // This runs if the DB connection fails
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
