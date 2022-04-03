"use strict";

const express = require("express");
const userRouter = require("./users");
const authRouter = require("./auth");
const authJwt = require("../middlewares/authJwt");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
