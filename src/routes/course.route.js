const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// Create a new course
router.post(
  "/",
  courseController.createCourse
);

// Get all courses
router.get("/", courseController.getAllCourses);

// Get course by ID
router.get("/:id", courseController.getCourseById);

// Update course by ID 
router.put(
  "/:id",
  courseController.updateCourse
);

// Delete course by ID 
router.delete(
  "/:id",
  courseController.deleteCourse
);

// Enroll a user in a course 
router.put(
  "/enrollUser/:courseId/:userId",
  courseController.userEnrollCourse
);

// Unenroll a user from a course 
router.put(
  "/unenrollUser/:courseId/:userId",
  courseController.userUnenrollCourse
);
module.exports = router;

// Enroll a teacher in a course 
router.put(
  "/enrollTeacher/:courseId/:teacherId",
  courseController.teacherEnrollCourse
);

// Unenroll a teacher from a course 
router.put(
  "/unenrollTeacher/:courseId/:teacherId",
  courseController.teacherUnenrollCourse
);

module.exports = router;