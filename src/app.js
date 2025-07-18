const express = require("express");
const userRoutes = require("./routes/user.route");
const teacherRoutes = require("./routes/teacher.route");
const courseRoutes = require("./routes/course.route");
const logger = require('./logger');

const app = express();

// Middleware
app.use(express.json());

app.get("/api", (req, res) => {
    logger.info("Health check endpoint hit");
    res.status(200).json({ message: "Learning Management System is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);

module.exports = app;