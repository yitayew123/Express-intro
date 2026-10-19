const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Student = require("./models/Student");

async function testModel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB for testing...");

    // Test 1: Create a valid student
    const validStudent = await Student.create({
      name: "Abebe",
      email: "ABEBE@example.com", // Notice the uppercase letters
      department: "Software Engineering",
      year: 3,
    });
    console.log("✅ Valid Student Created:", validStudent);

    // Test 2: Validation failures
    console.log("\n--- Testing Validations ---");
    try {
      await Student.create({
        name: "A", // Too short
        email: "not-an-email", // Invalid format
        department: "IT",
        year: 9, // Too high
      });
    } catch (error) {
      console.log("❌ Expected Validation Errors:");
      // Mongoose groups errors by field
      console.log(error.errors.name.message);
      console.log(error.errors.email.message);
      console.log(error.errors.year.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

testModel();
