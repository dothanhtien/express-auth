"use strict";
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth");

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).send({
      status: "error",
      message: "Token has expired",
    });
  }

  return res.status(401).send({
    status: "error",
    message: "Unauthorized",
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      status: "error",
      message: "No token provided",
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.userId;
    next();
  });
};

const auth = {
  verifyToken,
};

module.exports = auth;
