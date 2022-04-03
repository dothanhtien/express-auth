"use strict";
const { validationResult } = require("express-validator");
const { getUserByEmail } = require("../../services/users");
const { comparePassword, generateToken } = require("../../services/auth");

exports.signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Email or password is invalid",
      });
    }

    const passwordIsMatch = comparePassword(password, user.password);

    if (!passwordIsMatch) {
      return res.status(401).send({
        status: "error",
        message: "Email or password is invalid",
      });
    }

    const token = generateToken(user.id);

    const responseUser = { ...user.dataValues };
    delete responseUser.password;
    responseUser.accessToken = token;

    res.send({
      status: "success",
      data: responseUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
