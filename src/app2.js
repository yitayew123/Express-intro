/**
 * Express.js Server with Multiple Routes
 *
 * This file demonstrates a basic Express application with:
 * 1. A homepage route ("/") that returns a welcome message.
 * 2. An about route ("/about") that returns information about the app.
 * 3. An API route ("/api/info") that returns JSON data.
 * 4. A server that listens on port 4000.
 */

// Import the Express module
const express = require("express");

// Create the application
const app = express();

// Define the home route
// Responds with a plain text welcome message
app.get("/", (req, res) => {
  res.send("Welcome to my first Express application!");
});

// Define an about route
// Responds with a plain text description of the app
app.get("/about", (req, res) => {
  res.send("This application was created by students.");
});

// Define an API route
// Responds with JSON data containing app details
app.get("/api/info", (req, res) => {
  res.json({
    application: "Express Introduction",
    version: "1.0.0",
    status: "running",
  });
});

// Start the server
// Listens on port 4000 and logs the server URL once running
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
