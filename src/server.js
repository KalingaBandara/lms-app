// require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("../config/db");
const config = require("config")

// Connect to database
connectDB();

// Start server
// const PORT = process.env.PORT || 3000;
const PORT = config.get("app.port") || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
