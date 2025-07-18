const teacherService = require("../services/teacher.service")
const logger = require('../logger');

// Create a new teacher
exports.createTeacher = async (req, res) => {
    try {
        const { name, email } = req.body;

        const newTeacher = await teacherService.createTeacher({ name, email });

        res.status(201).json(newTeacher);

        logger.info("createTeacher endpoint hit");

    } catch (error) {

        var statusCode;
          if (error.message === "Name already exists" ||
              "Email already exists" || 
              "Name is required" ||
              "Email is required") {
              statusCode = 400;
          }

        res
          .status(statusCode)
          .json({
          message: "creating new teacher failed",
          error: error.message,
        });
        logger.error(error);
    }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const allTeachers = await teacherService.fetchTeachers();
        res.status(200).send(allTeachers);
        logger.info("getAllTeachers endpoint hit");
    } catch (error) {
        res
          .status(500)
          .json({message: "Failed to fetch teachers", error: error.message });
        logger.error(error);
    }
};

// Get a teacher by ID
exports.getTeacherById = async (req,res) => {
    try {
        const teacher = await teacherService.fetchTeacherById(req.params.id);
        res.status(200).json(teacher);
        logger.info("getTeacherById endpoint hit");
    } catch (error) {
        var statusCode = 500;
        if (error.message === "Teacher not found") {
            statusCode = 404;
        };
        if (error.message === "TeacherId is required") {
            statusCode = 400;
        }   
        res
          .status(statusCode)
          .json({ message: "Failed to fetch teacher", error: error.message }); 
        logger.error(error);           
    }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const updatedData = req.body;
        

        if (!teacherId) {
                return res.status(400).json({ message: "Teacher ID is required" })
            }
    
            const updatedTeacher = await teacherService.updateTeacherById(teacherId,updatedData);
    
            res.status(200).json({ message: "Teacher updated successfully", updatedTeacher });
        logger.info("updateTeacher endpoint hit");
    
        } catch (error) {
            const statusCode = error.message === ("Teacher not found") ? 404 : 500;
    
            res
                .status(statusCode)
                .json({ message: "Failed to update teacher", error: error.message });
            logger.error(error);
        }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await teacherService.deleteTeacherById(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(204).json({ message: "Teacher deleted successfully" ,deletedTeacher});
    logger.info("deleteTeacher endpoint hit");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete teacher", error: error.message });
    logger.error(error);
  }
};

// Get current teacher's profile
exports.getProfile = async (req, res) => {
  try {
    const teacherProfile = await teacherService.fetchTeacherProfileById(req.params.id);
    if (!teacherProfile) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacherProfile);

    logger.info("getTeacherProfile endpoint hit");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
    logger.error(error);
  }
};