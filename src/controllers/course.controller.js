const courseService = require("../services/course.service");
const logger = require('../logger');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newCourse = await courseService.createCourse({ title, description });

    res.status(201).json(newCourse);

    logger.info("createCourse endpoint hit");

  } catch (error) {
    var statusCode;
        if (error.message === "Title already exists" ||
            "Title is required") {
            statusCode = 400;
        }
    res
      .status(statusCode)
      .json({ message: "Failed to create course", error: error.message });
    logger.error(error);
  }
};

// Get all courses
exports.getAllCourses = async (req,res) => {
  try {
    const allCourses = await courseService.fetchCourses();
    res.status(200).json(allCourses);
    logger.info("getAllCourses endpoint hit");
  } catch (error){
    res 
      .status(500)
      .json({message: "failed to fetch courses", error: error.message});
    logger.error(error);
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try 
  {
    const course = await courseService.fetchCourseById(req.params.id);
    logger.info("getCourseById endpoint hit");

    if (!course) {
      return res.status(404).json({message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    var statusCode = 500;
    if (error.message === "Course not found") {
        statusCode = 404;
    };

    res
      .status(statusCode)
      .json({message: "Failed to fetch course", error: error.message });
    logger.error(error);
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;

    logger.info("updateCourse endpoint hit");

    if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" })
        }

    const updatedCourse = await courseService.updateCourseById(courseId,updatedData);

    res.status(200).json({ message: "Course updated successfully", updatedCourse });

  } catch (error) {
    res.
      status(500)
      .json({ message: "Failed to update course", error: error.message });
    logger.error(error);
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await courseService.deleteCourseById(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(204).json({ message: "Course deleted successfully" , deletedCourse});

    logger.info("deleteCourse endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete course", error: error.message });
    logger.error(error);
  }
};


// Enroll a user in a course
exports.userEnrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    const enrolledCourse = await courseService.userEnrollCourseByIds(courseId,userId);
    
    res.status(200).json({ message: "Enrolled in course successfully", enrolledCourse });
    logger.info("userEnrollCourse endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to enroll in course", error: error.message });
    logger.error(error);
  }
};

// Unenroll a user in a course
exports.userUnenrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    const unenrolledCourse = await courseService.userUnenrollCourseByIds(courseId,userId);
    
    res.status(200).json({ message: "Unenrolled in course successfully" , unenrolledCourse});
    logger.info("userUnenrollCourse endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to unenroll in course", error: error.message });
    logger.error(error);
  }
};

// Enroll a teacher in a course
exports.teacherEnrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const teacherId = req.params.teacherId;

    const enrolledCourse = await courseService.teacherEnrollCourseByIds(courseId,teacherId);
    
    res.status(200).json({ message: "Enrolled in course successfully", enrolledCourse });
    logger.info("teacherEnrollCourse endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to enroll in course", error: error.message });
    logger.error(error);
  }
};

// Unenroll a teacher in a course
exports.teacherUnenrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const teacherId = req.params.teacherId;

    const unenrolledCourse = await courseService.teacherUnenrollCourseByIds(courseId,teacherId);
    
    res.status(200).json({ message: "Unenrolled in course successfully", unenrolledCourse});
    logger.info("teacherUnenrollCourse endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to unenroll in course", error: error.message });
    logger.error(error);
  }
};
