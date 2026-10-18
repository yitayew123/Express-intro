/**
 * Topic 22 — Sorting and Pagination (Handling Large Datasets)
 *
 * This file demonstrates:
 * 1. Reading and validating query parameters (`req.query`).
 * 2. Dynamically sorting an array based on client input.
 * 3. Paginating data (slicing it into pages) to prevent sending huge payloads.
 * 4. Returning metadata (total pages, current page, sorting info) to help the frontend.
 *
 * Why is this important?
 *   If you have 10,000 students, sending all of them in one GET request will
 *   freeze the browser, drain the client's data plan, and likely crash the server.
 *   Pagination limits the response to a small "page" of data (e.g., 10 items).
 *
 * Pattern used: "Registrar function"
 */

function registerSortingPagination(app) {
  // In-memory dataset (5 students)
  const students = [
    { id: 1, name: "Abebe", department: "Software Engineering" },
    { id: 2, name: "Sara", department: "Computer Science" },
    { id: 3, name: "Marta", department: "Information Systems" },
    { id: 4, name: "Dawit", department: "Computer Science" },
    { id: 5, name: "Hana", department: "Software Engineering" },
  ];

  app.get("/pagination-demo/students", (req, res) => {
    // ===============================================================
    // 1. PARSE QUERY PARAMETERS
    // ===============================================================
    // `??` is the Nullish Coalescing Operator. It means: "If the left side is
    // null or undefined, use the right side." It allows for default values.
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 2);
    const sortBy = req.query.sortBy ?? "id";
    const order = req.query.order ?? "asc";

    // ===============================================================
    // 2. VALIDATE PARAMETERS
    // ===============================================================
    // Ensure page and limit are positive integers, and limit isn't absurdly high (max 100).
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        error: "Page must be positive; limit must be between 1 and 100.",
      });
    }

    // Security: Only allow sorting by specific fields.
    // If we didn't check this, a user could try to sort by a non-existent or sensitive field.
    const allowedSortFields = ["id", "name", "department"];

    if (
      !allowedSortFields.includes(sortBy) ||
      !["asc", "desc"].includes(order)
    ) {
      return res.status(400).json({
        error: "Invalid sorting field or order.",
        allowedSortFields,
        allowedOrders: ["asc", "desc"],
      });
    }

    // ===============================================================
    // 3. SORTING
    // ===============================================================
    // We use the spread operator `[...students]` to create a shallow copy.
    // Why? `.sort()` mutates (changes) the original array. We don't want
    // our original database to be permanently reordered by a user's request!
    const sorted = [...students].sort((a, b) => {
      const left = a[sortBy];
      const right = b[sortBy];

      // If the values are numbers, subtract them.
      // If they are strings, use `localeCompare` for alphabetical sorting.
      const comparison =
        typeof left === "number"
          ? left - right
          : String(left).localeCompare(String(right));

      // Return the comparison for ascending, or the negative for descending.
      return order === "asc" ? comparison : -comparison;
    });

    // ===============================================================
    // 4. PAGINATION (SLICING)
    // ===============================================================
    const total = sorted.length;
    const totalPages = Math.ceil(total / limit);

    // Calculate where to start slicing the array.
    // Page 1, limit 2 -> start at index 0.
    // Page 2, limit 2 -> start at index 2.
    const startIndex = (page - 1) * limit;

    // `.slice(start, end)` extracts a portion of the array.
    const data = sorted.slice(startIndex, startIndex + limit);

    // ===============================================================
    // 5. RESPONSE
    // ===============================================================
    res.status(200).json({
      pagination: {
        page,
        limit,
        total, // Total number of items overall
        totalPages, // Total number of pages available
      },
      sorting: { sortBy, order },
      data, // The actual items for this page
    });
  });
}

// Export the registrar function so app.js can call it with `app`
module.exports = registerSortingPagination;
