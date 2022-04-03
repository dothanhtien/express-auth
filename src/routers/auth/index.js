"use strict";
const express = require("express");
const authController = require("../../controllers/auth");
const userController = require("../../controllers/users");
const authService = require("../../services/auth");
const userService = require("../../services/users");
const authJwt = require("../../middlewares/authJwt");

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  authService.validate("signIn"),
  authController.signIn
);
authRouter.post("/sign-up", userService.validate(), userController.createUser);

authRouter.get("/me", authJwt.verifyToken, authController.getMe);

module.exports = authRouter;
