const Teacher = require("../models/teacher.model");
const Course = require("../models/course.model");

exports.createTeacher = async ({ name, email }) => {
    // Check if teacher exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
        throw new Error("Teacher already exists");
    }

    // Create and return the teacher
    return await Teacher.create({ name, email });
};

exports.fetchTeachers = async () => {

    // Return all the teachers 
    return await Teacher.find();
};

exports.fetchTeacherById = async (id) => {

    if (!id) {
        throw new Error("TeacherId is required");
    }
    // Check if teacher exists
    const teacher = await Teacher.findById(id);
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    // Return the teacher for given id 
    return teacher;
};

exports.updateTeacherById = async ( id, updatedData ) => {
    if (!id) {
        throw new Error("TeacherId is required");
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
        id,
        updatedData,
        { new:true, runValidators: true} 
    );

    if (!updatedTeacher) {
        throw new Error("Teacher not found")
    }

    return updatedTeacher;
};

exports.deleteTeacherById = async (id) => {
    if (!id) {
        throw new Error("TeacherId is required");
    }
    // Check if user exists
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    await Course.updateMany(
              { id },
              { $pull: { enrolledTeachers: id } }
            );

    if (!deletedTeacher) {
        throw new Error("Teacher not found");
    }
    // Return the user for given id 
    return deletedTeacher;
};

exports.fetchTeacherProfileById = async (id) => {
    if (!id) {
        throw new Error("TeacherId is required");
    }
    const teacherProfile = await Teacher.findById(id)
      .populate("enrolledCourses", "title description");

    if (!teacherProfile) {
        throw new Error("Teacher not found");
    }
    return teacherProfile;
};



