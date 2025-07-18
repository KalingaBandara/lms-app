const Course = require("../models/course.model");
const User = require("../models/user.model");
const Teacher = require("../models/teacher.model");

exports.createCourse = async ({ title, description }) => {

    // Create and return the course
    return await Course.create({ title, description });
};

exports.fetchCourses = async () => {

    // Return all the courses
    return await Course.find()
        .populate("enrolledTeachers", "name email")
        .select("title description enrolledTeachers enrolledUsers createdAt");
};

exports.fetchCourseById = async (id) => {

    if (!id) {
        throw new Error("CourseId is required");
    }
    // Check if course exists
    const course = await Course.findById(id)
        .populate("enrolledTeachers", "name email")
        .populate("enrolledUsers", "name email");
    if (!course) {
        throw new Error("Course not found");
    }
    // Return the course for given id 
    return course;
};

exports.updateCourseById = async ( id, updatedData ) => {
    if (!id) {
        throw new Error("CourseId is required");
    }
    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        updatedData,
        { new:true, runValidators: true} 
    );

    if (!updatedCourse) {
        throw new Error("Course not found")
    }

    return updatedCourse;
};

exports.deleteCourseById = async (id) => {
    if (!id) {
        throw new Error("CourseId is required");
    }
    // Check if course exists
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
        throw new Error("Course not found");
    }

    await User.updateMany(
          { enrolledCourses: id },
          { $pull: { enrolledCourses: id } }
        );

    await Course.updateMany(
          { enrolledCourses: id },
          { $pull: { enrolledCourses: id } }
        );

    return deletedCourse;
};

exports.userEnrollCourseByIds = async (courseId, userId) => {
    if (!courseId) {
        throw new Error("CourseId is required");
    }  

    if (!userId) {
        throw new Error("userId is required");
    }

    const enrolledCourse = await Course.findById(courseId);
    if (!enrolledCourse) {
      throw new Error("Course not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (enrolledCourse.enrolledUsers.includes(userId)) {
      throw new Error("User already enrolled in the course");
    }

    await Course.findByIdAndUpdate(courseId, {
        $push: { enrolledUsers: userId },
    });
    
    await User.findByIdAndUpdate(userId, {
        $push: { enrolledCourses: courseId },
    });

    return enrolledCourse;
};

exports.userUnenrollCourseByIds = async (courseId, userId) => {
    if (!courseId) {
        throw new Error("CourseId is required");
    }  

    if (!userId) {
        throw new Error("userId is required");
    }
  
    const unenrolledCourse = await Course.findById(courseId);
    if (!unenrolledCourse) {
      throw new Error("Course not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!unenrolledCourse.enrolledUsers.includes(userId)) {
      throw new Error("User already unenrolled in the course");
    }

    await Course.findByIdAndUpdate(courseId, {
        $pull: { enrolledUsers: userId },
    });
    
    await User.findByIdAndUpdate(userId, {
        $pull: { enrolledCourses: courseId },
    });

    return unenrolledCourse;
};

exports.teacherEnrollCourseByIds = async (courseId, teacherId) => {
    if (!courseId) {
        throw new Error("CourseId is required");
    }  

    if (!teacherId) {
        throw new Error("teacherId is required");
    }  
  
    const enrolledCourse = await Course.findById(courseId);
    if (!enrolledCourse) {
      throw new Error("Course not found");
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    if (enrolledCourse.enrolledTeachers.includes(teacherId)) {
      throw new Error("Teacher already enrolled in the course");
    }

    await Course.findByIdAndUpdate(courseId, {
        $push: { enrolledTeachers: teacherId },
    });
    
    await Teacher.findByIdAndUpdate(teacherId, {
        $push: { enrolledCourses: courseId },
    });

    return enrolledCourse;
};

exports.teacherUnenrollCourseByIds = async (courseId, teacherId) => {
    if (!courseId) {
        throw new Error("CourseId is required");
    }  

    if (!teacherId) {
        throw new Error("teacherId is required");
    }
    const unenrolledCourse = await Course.findById(courseId);
    if (!unenrolledCourse) {
      throw new Error("Course not found");
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    if (!unenrolledCourse.enrolledTeachers.includes(teacherId)) {
      throw new Error("Teacher already unenrolled in the course");
    }

    await Course.findByIdAndUpdate(courseId, {
        $pull: { enrolledTeachers: teacherId },
    });
    
    await Teacher.findByIdAndUpdate(teacherId, {
        $pull: { enrolledCourses: courseId },
    });

    return unenrolledCourse;
};