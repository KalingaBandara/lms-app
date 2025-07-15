const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

// Route to create a teacher
router.post(
    "/",
    teacherController.createTeacher
);

// Route to get teacher's profile
router.get(
  "/profile/:id",
  teacherController.getProfile
);

// Route to get all teacher
router.get(
  "/",
  teacherController.getAllTeachers
);

// Route to get teacher by ID 
router.get(
  "/:id",
  teacherController.getTeacherById
);

// Route to update teacher by ID 
router.put(
  "/:id",
  teacherController.updateTeacher
);

// Route to delete teacher by ID 
router.delete(
  "/:id",
  teacherController.deleteTeacher
);

module.exports = router;