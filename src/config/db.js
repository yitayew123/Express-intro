/**
 * Topic 24 — Database Connection (MongoDB with Mongoose)
 *
 * This file demonstrates:
 * 1. Connecting an Express application to a MongoDB database using Mongoose.
 * 2. Using environment variables (`process.env`) to keep credentials secure.
 * 3. Handling asynchronous connection logic with `async/await`.
 * 4. Failing fast (throwing an error) if the configuration is missing.
 *
 * Why use Mongoose?
 *   MongoDB is a NoSQL database. Mongoose is an ODM (Object Data Modeling)
 *   library that provides a schema-based solution to model your application
 *   data. It also handles the low-level connection logic and connection pooling.
 *
 * Prerequisites:
 *   1. Run `npm install mongoose dotenv`
 *   2. Create a `.env` file in your project root and add:
 *      MONGODB_URI=mongodb://localhost:27017/your_database_name
 *   3. (If using MongoDB Atlas) Replace the URI with your Atlas connection string.
 */

const mongoose = require("mongoose");

async function connectDB() {
  // 1. Retrieve the connection string from environment variables.
  // NEVER hardcode your database password in the source code!
  const uri = process.env.MONGODB_URI;

  // 2. Fail fast if the environment variable is missing.
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  // 3. Connect to the database. This returns a promise, so we `await` it.
  // Mongoose establishes a connection pool, meaning it can handle multiple
  // requests to the database simultaneously.
  const connection = await mongoose.connect(uri);

  // 4. Log the name of the database we successfully connected to.
  // `connection.connection.name` extracts the DB name from the URI.
  console.log(`MongoDB connected to database: ${connection.connection.name}`);
}

// Export the function so it can be called during server startup.
module.exports = connectDB;
