"use strict";
const express = require("express");
const authController = require("../../controllers/auth");
const userController = require("../../controllers/users");
const authService = require("../../services/auth");
const userService = require("../../services/users");
const { body } = require("express-validator");

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  authService.validate("signIn"),
  authController.signIn
);
authRouter.post(
  "/sign-up",
  userService.validate(),
  userController.createUser
);

module.exports = authRouter;
