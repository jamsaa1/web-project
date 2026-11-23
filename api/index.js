
import app from "./app.js";

const port = process.env.PORT || 3000;

// Start the Express server.
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// Log server errors.
server.on("error", (error) => {
  console.error("Server error:", error);
});

// Detect when the server closes.
server.on("close", () => {
  console.log("Server has been closed");
});
