"use strict";
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    req.userId = decoded.userId;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
