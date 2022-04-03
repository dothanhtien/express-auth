"use strict";
const express = require("express");
const authController = require("../../controllers/auth");
const userController = require("../../controllers/users");

const authRouter = express.Router();

authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-up", userController.createUser);

module.exports = authRouter;
