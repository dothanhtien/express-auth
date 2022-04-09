"use strict";
const { validationResult } = require("express-validator");
const { getUserByEmail, getUserById } = require("../../services/users");
const { comparePassword, generateToken } = require("../../services/auth");
const {
  generateRefreshToken,
  deleteRefreshTokenByUserId,
  getRefreshToken,
  verifyRefreshTokenExpiration,
  deleteRefreshToken,
} = require("../../services/refreshToken");

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

    // check if user does not exist
    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Email or password is invalid",
      });
    }

    const passwordIsMatch = comparePassword(password, user.password);

    // check if password does not match
    if (!passwordIsMatch) {
      return res.status(401).send({
        status: "error",
        message: "Email or password is invalid",
      });
    }

    // BEGIN BLOCK: delete refreshToken if it is existing before creating a new one
    const existingRefreshToken = await user.getRefreshToken();

    if (existingRefreshToken) {
      const isDeleteRefreshToken = await deleteRefreshTokenByUserId(user.id);

      if (!isDeleteRefreshToken) {
        return res.status(500).send({
          status: "error",
          message: "Something went wrong",
        });
      }
    }

    const refreshToken = await generateRefreshToken(user);

    if (!refreshToken) {
      return res.status(500).send({
        status: "error",
        message: "Something went wrong",
      });
    }
    // END BLOCK

    const token = generateToken(user.id);

    const responseUser = { ...user.dataValues };
    delete responseUser.password;
    responseUser.accessToken = token;
    responseUser.refreshToken = refreshToken.token;

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

exports.getMe = async (req, res) => {
  const { userId } = req;

  const me = await getUserById(userId);

  if (!me) {
    return res.status(404).send({
      status: "error",
      message: "User does not exist",
    });
  }

  res.send({
    status: "success",
    data: me,
  });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: reqRefreshToken } = req.body;

  // check if req.body has no refreshToken
  if (!reqRefreshToken) {
    return res.status(400).send({
      status: "error",
      message: "Refresh token is required",
    });
  }

  const refreshToken = await getRefreshToken(reqRefreshToken);

  // check if refresh token does not exist
  if (!refreshToken) {
    return res.status(404).send({
      status: "error",
      message: "Refresh token does not exist",
    });
  }

  // check if refresh token has expired
  if (verifyRefreshTokenExpiration(refreshToken)) {
    const isDeleteRefreshToken = await deleteRefreshToken(refreshToken.token);

    if (!isDeleteRefreshToken) {
      return res.status(500).send({
        status: "error",
        message: "Something went wrong",
      });
    }

    return res.status(403).send({
      status: "error",
      message: "Refresh token has expired. Please make a new sign in request",
    });
  }

  const user = await refreshToken.getUser();

  const accessToken = generateToken(user.id);

  res.send({
    accessToken,
    refreshToken: refreshToken.token,
  });
};
