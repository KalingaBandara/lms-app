const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator")

const validate = require('../middleware/validate');

// Route to create a user
router.post(
  "/",
  userValidator.requestBodyValidator,
  validate.validate,
  userController.createUser
);

// Route to get user's profile
router.get(
  "/profile/:id",
  userValidator.emptyRequestBodyValidator,
  userValidator.requestParamValidator,
  validate.validate,
  userController.getProfile
);

// Route to get all users
router.get(
  "/",
  userValidator.emptyRequestBodyValidator,
  validate.validate,
  userController.getAllUsers
);

// Route to get user by ID 
router.get(
  "/:id",
  userValidator.emptyRequestBodyValidator,
  userValidator.requestParamValidator,
  validate.validate,
  userController.getUserById
);

// Route to update user by ID 
router.put(
  "/:id",
  userValidator.requestBodyValidator,
  userValidator.requestParamValidator,
  validate.validate,
  userController.updateUser
);

// Route to delete user by ID 
router.delete(
  "/:id",
  userValidator.emptyRequestBodyValidator,
  userValidator.requestParamValidator,
  validate.validate,
  userController.deleteUser
);

module.exports = router;