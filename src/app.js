const express = require("express");
const userRoutes = require("./routes/user.route");
const teacherRoutes = require("./routes/teacher.route");
const courseRoutes = require("./routes/course.route");

// const OpenApiValidator = require('express-openapi-validator');

const app = express();

// Middleware
app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: false }));

// app.use(
//     OpenApiValidator.middleware({
//         apiSpec: './api.yaml',
//         validateResponses: true,
//     })
// );

// Routes
app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);

module.exports = app;