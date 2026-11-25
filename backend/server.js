
const dns = require("dns");

// MongoDB Atlas DNS configuration
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Authentication Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/saved-jobs", require("./routes/savedJobRoutes"));

// Assessment Routes
app.use("/api/assessment", require("./routes/assessmentRoutes"));

// Home API
app.get("/", (req, res) => {
  res.status(200).send("Welcome to SkillBridge Backend API!");
});

// Backend Test API
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillBridge Backend is working successfully!"
  });
});

// Server Status API
app.get("/api/status", (req, res) => {
  res.status(200).json({
    success: true,
    project: "SkillBridge",
    status: "Server is running",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
    databaseName: mongoose.connection.name || "Not connected"
  });
});

// Unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Server Configuration
const PORT = process.env.PORT || 5000;

// Start Server
async function startServer() {
  try {
    // Check environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env file");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from .env file");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("--------------------------------");
    console.log("MongoDB Connected Successfully!");
    console.log("Database:", mongoose.connection.name);
    console.log("SkillBridge Backend Started");
    console.log(`Server running on port ${PORT}`);
    console.log("--------------------------------");

    // Start Express server
    app.listen(PORT, () => {
      console.log("Server is ready!");
    });

  } catch (error) {
    console.error("--------------------------------");
    console.error("Backend Startup Failed!");
    console.error(error.message);
    console.error("--------------------------------");

    process.exit(1);
  }
}

// Handle MongoDB connection errors
mongoose.connection.on("error", (error) => {
  console.error("MongoDB Connection Error:", error.message);
});

// Start application
startServer();