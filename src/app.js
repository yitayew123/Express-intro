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


// Middleware Example:


const express = require("express");

const app = express();
const PORT = 3000;

// Import Topic 1: Introduction to Middleware
const registerMiddlewareIntroduction = require("./Middleware/MiddlewareIntroduction");

// Import Topic 2: Request-Response Cycle (Multiple Middleware Chain)
const registerRequestResponseCycle = require("./Middleware/RequestResponseCycle");

// Import Topic 3: Middleware Parameters (Attaching Data to `req`)
const registerMiddlewareParameters = require("./Middleware/MiddlewareParameters");

// Register Topic 1
registerMiddlewareIntroduction(app);

// Register Topic 2
registerRequestResponseCycle(app);

// Register Topic 3
registerMiddlewareParameters(app);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

