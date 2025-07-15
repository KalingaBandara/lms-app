const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        unique: [true, "Name already exists"],
        trim: true,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email already exists"],
        trim: true,
        lowercase: true,
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
