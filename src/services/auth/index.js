"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const authConfig = require("../../configs/auth");

const validate = (method) => {
  switch (method) {
    case "signIn": {
      return [
        body("email")
          .trim()
          .notEmpty()
          .withMessage("Email must not be empty")
          .isEmail()
          .withMessage("Email is invalid")
          .isLength({ max: 255 })
          .withMessage("Email cannot be more than 255 characters"),
        body("password")
          .trim()
          .notEmpty()
          .withMessage("Password must not be empty")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long")
          .isLength({ max: 255 })
          .withMessage("Password cannot be more than 255 characters"),
      ];
    }
  }
};

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);

  return isMatch;
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, authConfig.secret, {
    expiresIn: +authConfig.expiresIn,
  });

  return token;
};

module.exports = {
  encryptPassword,
  comparePassword,
  generateToken,
  validate,
};
