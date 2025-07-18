const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: [true, "Title already exists"],
        trim: true,
    },
    description: {
        type: String,
    },
    enrolledTeachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    enrolledUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;