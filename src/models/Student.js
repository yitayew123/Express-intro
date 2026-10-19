/**
 * Topic 25 — Mongoose Schema & Model Definition (Data Integrity)
 *
 * This file demonstrates:
 * 1. Creating a Mongoose Schema to define the shape of a document.
 * 2. Applying built-in validators (required, minlength, match, etc.).
 * 3. Adding schema options (like `timestamps`).
 * 4. Exporting a Model to interact with the database.
 *
 * What is a Schema vs. a Model?
 *   - SCHEMA: The blueprint (e.g., "A student must have a name and email").
 *   - MODEL: The actual tool used to query the database (e.g., "Find, Create, Update students").
 *   Mongoose turns the Schema into a Model when you call `mongoose.model()`.
 *
 * Note on `unique: true`:
 *   Unlike other validators, `unique` is NOT a validation check that runs before saving.
 *   Instead, it creates a UNIQUE INDEX in the MongoDB database itself.
 *   If you try to save a duplicate email, MongoDB throws an error (code 11000).
 */

const mongoose = require("mongoose");

// Define the structure (schema) of a Student document
const studentSchema = new mongoose.Schema(
  {
    // ===============================================================
    // NAME FIELD
    // ===============================================================
    name: {
      type: String,
      // Custom error message if the field is missing or empty
      required: [true, "Student name is required"],
      // Automatically removes leading/trailing whitespace
      trim: true,
      // Minimum length validation
      minlength: [2, "Name must contain at least 2 characters"],
      // Maximum length validation
      maxlength: [80, "Name cannot exceed 80 characters"],
    },

    // ===============================================================
    // EMAIL FIELD
    // ===============================================================
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      // Automatically converts the email to lowercase (e.g., HANA@mail.com -> hana@mail.com)
      lowercase: true,
      // Enforces uniqueness at the database level (creates a unique index)
      unique: true,
      // Regex validation to ensure it looks like a real email address
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    // ===============================================================
    // DEPARTMENT FIELD
    // ===============================================================
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    // ===============================================================
    // YEAR FIELD
    // ===============================================================
    year: {
      type: Number,
      required: [true, "Study year is required"],
      // Minimum numeric value validation
      min: [1, "Study year must be at least 1"],
      // Maximum numeric value validation
      max: [8, "Study year cannot exceed 8"],
    },
  },
  {
    // ===============================================================
    // SCHEMA OPTIONS
    // ===============================================================
    // `timestamps: true` automatically adds two fields to every document:
    // - createdAt: The date/time the document was first saved.
    // - updatedAt: The date/time the document was last modified.
    timestamps: true,
  },
);

// Compile the schema into a Model and export it.
// The string "Student" is important: Mongoose will automatically
// look for (and create) a collection named "students" in the database.
module.exports = mongoose.model("Student", studentSchema);
