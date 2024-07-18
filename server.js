import dotenv from "dotenv";
import path from "path"; // Import the path module
import express from "express"; // Import the express module
import connectDatabase from "./config/database.js";
import app from "./app.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDatabase();

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is working on PORT ${PORT}`);
});

// Set Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://linkedin-gemini-gs-server.onrender.com"
  );
  next();
});

// Serve static files from the React app
const __dirname = path.resolve(); // Resolve the current directory
app.use(express.static(path.join(__dirname, "client", "build")));

// Serve the React app for all client-side routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
