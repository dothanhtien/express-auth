"use strict";
const express = require("express");
const userController = require("../../controllers/users");

const userRouter = express.Router();

// create an user
userRouter.post("/", userController.createUser);

// get list of users
userRouter.get("/", userController.getUsers);

// get an user
userRouter.get("/:id", userController.getUserDetails);

// update an user
userRouter.patch("/:id", userController.updateUser);

// delete an user
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
