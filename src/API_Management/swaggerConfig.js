/**
 * Topic 23 — Loading API Documentation (OpenAPI/Swagger YAML)
 *
 * This file demonstrates:
 * 1. Reading an external file using Node's `fs` (File System) module.
 * 2. Constructing safe file paths using the `path` module.
 * 3. Parsing YAML data into a JavaScript object using the `yaml` library.
 * 4. Exporting the parsed configuration so it can be used by Swagger UI.
 *
 * Why YAML instead of JSON?
 *   While OpenAPI supports both JSON and YAML, YAML is vastly preferred
 *   for documentation because it is human-readable, supports comments,
 *   and is much easier to write by hand.
 *
 * Prerequisites:
 *   1. Run `npm install yaml swagger-ui-express`
 *   2. Create an `openapi.yaml` file in the SAME folder as this file.
 */

const fs = require("fs"); // Built-in Node module for file operations
const path = require("path"); // Built-in Node module for safe file paths
const YAML = require("yaml"); // Third-party package to parse YAML

// Construct the absolute path to the openapi.yaml file.
// __dirname is the directory where THIS file lives (src/docs).
const openApiPath = path.join(__dirname, "openapi.yaml");

// Read the file synchronously as a UTF-8 string, then parse it into a JS object.
// Note: readFileSync is fine here because this only runs ONCE when the server starts.
const openApiDocument = YAML.parse(fs.readFileSync(openApiPath, "utf8"));

// Export the parsed OpenAPI object so Swagger UI can read it.
// This object contains the entire definition of your API (paths, schemas, etc.).
module.exports = openApiDocument;
