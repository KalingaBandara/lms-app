const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");
const teacherValidator = require("../validators/teacher.validator")

const validate = require('../middleware/validate');

// Route to create a teacher
router.post(
    "/",
    teacherValidator.requestBodyValidator,
    validate.validate,
    teacherController.createTeacher
);

// Route to get teacher's profile
router.get(
  "/profile/:id",
  teacherValidator.emptyRequestBodyValidator,
  teacherValidator.requestParamValidator,
  validate.validate,
  teacherController.getProfile
);

// Route to get all teacher
router.get(
  "/",
  teacherValidator.emptyRequestBodyValidator,
  validate.validate,
  teacherController.getAllTeachers
);

// Route to get teacher by ID 
router.get(
  "/:id",
  teacherValidator.emptyRequestBodyValidator,
  teacherValidator.requestParamValidator,
  validate.validate,
  teacherController.getTeacherById
);

// Route to update teacher by ID 
router.put(
  "/:id",
  teacherValidator.requestBodyValidator,
  teacherValidator.requestParamValidator,
  validate.validate,
  teacherController.updateTeacher
);

// Route to delete teacher by ID 
router.delete(
  "/:id",
  teacherValidator.emptyRequestBodyValidator,
  teacherValidator.requestParamValidator,
  validate.validate,
  teacherController.deleteTeacher
);

module.exports = router;