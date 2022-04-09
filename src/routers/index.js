"use strict";

const express = require("express");
const userRouter = require("./users");
const authRouter = require("./auth");
const authMiddleware = require("../middlewares/auth");

const rootRouter = express.Router();

rootRouter.use("/users", authMiddleware.verifyToken, userRouter);
rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
