const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Route to create a user
router.post(
    "/",
    userController.createUser
);

// Route to get user's profile
router.get(
  "/profile/:id",
  userController.getProfile
);

// Route to get all users
router.get(
  "/",
  userController.getAllUsers
);

// Route to get user by ID 
router.get(
  "/:id",
  userController.getUserById
);

// Route to update user by ID 
router.put(
  "/:id",
  userController.updateUser
);

// Route to delete user by ID 
router.delete(
  "/:id",
  userController.deleteUser
);

module.exports = router;