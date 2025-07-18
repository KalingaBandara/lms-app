const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");
const courseValidator = require("../validators/course.validator")

const validate = require('../middleware/validate');

// Create a new course
router.post(
  "/",
  courseValidator.requestBodyValidator,
  validate.validate,
  courseController.createCourse
);

// Get all courses
router.get("/", 
  courseValidator.emptyRequestBodyValidator,
  validate.validate,
  courseController.getAllCourses);

// Get course by ID
router.get("/:id", 
  courseValidator.emptyRequestBodyValidator,
  courseValidator.requestParamIdValidator,
  validate.validate,
  courseController.getCourseById);

// Update course by ID 
router.put(
  "/:id",
  courseValidator.requestBodyValidator,
  courseValidator.requestParamIdValidator,
  validate.validate,
  courseController.updateCourse
);

// Delete course by ID 
router.delete(
  "/:id",
  courseValidator.emptyRequestBodyValidator,
  courseValidator.requestParamIdValidator,
  validate.validate,
  courseController.deleteCourse
);

// Enroll a user in a course 
router.put(
  "/enrollUser/:courseId/:userId",
  courseValidator.emptyRequestBodyValidator,
  courseValidator.requestParamUserIdValidator,
  courseValidator.requestParamCourseIdValidator,
  validate.validate,
  courseController.userEnrollCourse
);

// Unenroll a user from a course 
router.put(
  "/unenrollUser/:courseId/:userId",
  courseValidator.emptyRequestBodyValidator,
  courseValidator.requestParamUserIdValidator,
  courseValidator.requestParamCourseIdValidator,
  validate.validate,
  courseController.userUnenrollCourse
);
module.exports = router;

// Enroll a teacher in a course 
router.put(
  "/enrollTeacher/:courseId/:teacherId",
  courseValidator.emptyRequestBodyValidator,
  courseValidator.requestParamTeacherIdValidator,
  courseValidator.requestParamCourseIdValidator,
  validate.validate,
  courseController.teacherEnrollCourse
);

// Unenroll a teacher from a course 
router.put(
  "/unenrollTeacher/:courseId/:teacherId",
  courseValidator.emptyRequestBodyValidator,
  courseValidator.requestParamTeacherIdValidator,
  courseValidator.requestParamCourseIdValidator,
  validate.validate,
  courseController.teacherUnenrollCourse
);

module.exports = router;