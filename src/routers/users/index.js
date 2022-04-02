"use strict";

const express = require("express");

const userRouter = express.Router();

// get list of users
userRouter.get("/", async (req, res) => {
  res.send({ message: "hello world!" });
});

module.exports = userRouter;
