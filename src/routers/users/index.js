"use strict";
const express = require("express");
const userController = require("../../controllers/users");
const userService = require("../../services/users");

const userRouter = express.Router();

// create an user
userRouter.post("/", userService.validate(), userController.createUser);

// get list of users
userRouter.get("/", userController.getUsers);

// get an user
userRouter.get("/:id", userController.getUserDetails);

// update an user
userRouter.patch("/:id", userService.validate(), userController.updateUser);

// delete an user
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
