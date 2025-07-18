const User = require("../models/user.model");
const Course = require("../models/course.model");

exports.createUser = async ({ name, email }) => {

    // Create and return the user
    return await User.create({ name, email });
};

exports.fetchUsers = async () => {

    // Return all the users 
    return await User.find();
};

exports.fetchUserById = async (id) => {
    
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    
    // Return the user for given id 
    return user;
};

exports.updateUserById = async ( id, updatedData ) => {

    const updatedUser = await User.findByIdAndUpdate(
        id,
        updatedData,
        { new:true, runValidators: true} 
    );

    if (!updatedUser) {
        throw new Error("User not found")
    }

    return updatedUser;
};

exports.deleteUserById = async (id) => {
    
    // Check if user exists
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error("User not found");
    }
    // // Delete user from course model
    // await Course.updateMany(
    //           { id },
    //           { $pull: { enrolledUsers: id } }
    //         );
    // Return the user for given id 
    return deletedUser;
};

exports.fetchUserProfileById = async (id) => {
    
    const userProfile = await User.findById(id)
      .populate("enrolledCourses", "title description");

    if (!userProfile) {
        throw new Error("User not found");
    }
    return userProfile;
};



