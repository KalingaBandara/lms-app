const userService = require("../services/user.service");
const logger = require('../logger');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const newUser = await userService.createUser({ name, email });

        logger.info("createuser endpoint hit");

        res.status(201).json(newUser);

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
            message: "creating new user failed",
            error: error.message,
        });
        logger.error(error);

    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.fetchUsers();
        res.status(200).send(allUsers);
        logger.info("getAllUsers endpoint hit");


    } catch (error) {
        res
            .status(500)
            .json({
                message: "Failed to fetch users", error: error.message 
            });
        logger.error(error);

    }
};

// Get a user by ID
exports.getUserById = async (req,res) => {
    try {
        const user = await userService.fetchUserById(req.params.id);
        res.status(200).send(user);
        logger.info("getUserById endpoint hit");

    } catch (error) {
        var statusCode = 500;
        if (error.message === "User not found") {
            statusCode = 404;
        };               
        res
            .status(statusCode)
            .json({ message: "Failed to fetch user", error: error.message }); 
        logger.error(error);           
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" })
        }

        const updatedUser = await userService.updateUserById(userId,updatedData);

        logger.info("updateUser endpoint hit");

        res.status(200).json({ message: "User updated successfully", updatedUser });

    } catch (error) {
        const statusCode = error.message === ("User not found") ? 404 : 500;

        res
            .status(statusCode)
            .json({ message: "Failed to update user", error: error.message });
        logger.error(error);
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUserById(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(204).send({ message: "User deleted successfully" , deletedUser});
    logger.info("deleteUser endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
    logger.error(error);
  }
};

// Get current user's profile
exports.getProfile = async (req, res) => {
  try {
    const userProfile = await userService.fetchUserProfileById(req.params.id);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userProfile);
    logger.info("getUserProfile endpoint hit");

  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
    logger.error(error);
  }
};