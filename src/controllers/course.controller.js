const Course = require("../models/course.model");
const User = require("../models/user.model");
const Teacher = require("../models/teacher.model");

const courseService = require("../services/course.service");
const userService = require("../services/user.service");
const teacherService = require("../services/teacher.service");


// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    
            const newCourse = await courseService.createCourse({ title, description });
    
            res.status(201).json(newCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create course", error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req,res) => {
  try {
    const allCourses = await courseService.fetchCourses();
            res.status(200).json(allCourses);
  } catch (error){
    res 
      .status(500)
      .json({message: "failed to fetch courses", error: error.message});
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try 
  {
    const course = await courseService.fetchCourseById(req.params.id);
    

    if (!course) {
      return res.status(404).json({message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({message: "Failed to fetch course", error: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;

    if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" })
        }

    const updatedCourse = await courseService.updateCourseById(courseId,updatedData);

    res.status(200).json({ message: "Course updated successfully", updatedCourse });

  } catch (error) {
    res.
      status(500)
      .json({ message: "Failed to update course", error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await courseService.deleteCourseById(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete course", error: error.message });
  }
};


// Enroll a user in a course
exports.userEnrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    const enrolledCourse = await courseService.userEnrollCourseByIds(courseId,userId);
    
    res.status(200).json({ message: "Enrolled in course successfully", enrolledCourse });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to enroll in course", error: error.message });
  }
};

// Unenroll a user in a course
exports.userUnenrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    await courseService.userUnenrollCourseByIds(courseId,userId);
    
    res.status(200).json({ message: "Unenrolled in course successfully" });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to unenroll in course", error: error.message });
  }
};

// Enroll a teacher in a course
exports.teacherEnrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const teacherId = req.params.teacherId;

    const enrolledCourse = await courseService.teacherEnrollCourseByIds(courseId,teacherId);
    
    res.status(200).json({ message: "Enrolled in course successfully", enrolledCourse });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to enroll in course", error: error.message });
  }
};

// Unenroll a teacher in a course
exports.teacherUnenrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const teacherId = req.params.teacherId;

    await courseService.teacherUnenrollCourseByIds(courseId,teacherId);
    
    res.status(200).json({ message: "Unenrolled in course successfully" });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to unenroll in course", error: error.message });
  }
};
