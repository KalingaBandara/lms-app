const app = require("./app");
const config = require("config")
const logger = require('./logger');

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = config.get("db.uri");

        logger.info(mongoURI);
        await mongoose.connect(mongoURI)

        logger.info("Connected to DB",mongoURI);

    } catch (err) {
        logger.error("Internal Server Error");
        process.exit(1);
    }
};

connectDB();

// Start server
const PORT = config.get("app.port") || 3000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);

});
