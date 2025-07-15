const mongoose = require("mongoose");
// require("dotenv").config() // Automatically load the variables from .env file into process.env
const config = require("config");

const connectDB = async () => {
    try {
        const mongoURI = config.get("db.uri");

        // await mongoose.connect(process.env.MONGODB_URI)
        console.log(mongoURI);
        await mongoose.connect(mongoURI)

        // console.log("Connected to DB",process.env.MONGODB_URI);
        console.log("Connected to DB",mongoURI);

    } catch (err) {
        // console.error("MongoDB connection error", err.message);
        console.error("Internal Server Error");
        process.exit(1);
    }
};

module.exports = connectDB;

// const clearDatabase = async () => {
//     try {
//         await connection.close();
//         console.log("DB cleared successfully");
//     } catch (error) {
//         console.error("Internal Server Error");
//     }
// };

// const closeDatabase = async () => {
//     try {
//         await connection.close();
//         console.log("DB connection closed");
//     } catch (error) {
//         console.error("Internal Server Error");
//     }
// };

// const dropDatabase = async () => {
//     try {
//         await connection.close();
//         console.log("Database dropped");
//     } catch (error) {
//         console.error("Internal Server Error");
//     }
// };

// module.exports = connectDB, clearDatabase, closeDatabase, dropDatabase;