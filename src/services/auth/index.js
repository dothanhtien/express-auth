"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth");

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
    expiresIn: authConfig.expiresIn,
  });

  return token;
};

module.exports = {
  encryptPassword,
  comparePassword,
  generateToken,
};
