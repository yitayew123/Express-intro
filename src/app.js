
const express = require("express");

// Create the application
const app = express();

// Define the home route
app.get("/", (req, res) => {
  res.send("Welcome to my first Express application!");
});

// Define an about route
app.get("/about", (req, res) => {
  res.send("This application was created by students.");
});

// Define an API route
app.get("/api/info", (req, res) => {
  res.json({
    application: "Express Introduction",
    version: "1.0.0",
    status: "running"
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
