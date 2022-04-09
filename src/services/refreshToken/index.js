const { v4: uuidv4 } = require("uuid");
const authConfig = require("../../configs/auth");
const { RefreshToken } = require("../../../models");

const generateRefreshToken = async (user) => {
  try {
    let token = uuidv4();
    let expiredAt = new Date();
    expiredAt.setSeconds(
      expiredAt.getSeconds() + +authConfig.refreshTokenExpiration
    );

    const refreshToken = await user.createRefreshToken({
      token,
      expiryDate: expiredAt.getTime(),
    });

    if (!refreshToken) {
      return null;
    }

    return refreshToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteRefreshTokenByUserId = async (userId) => {
  try {
    const num = await RefreshToken.destroy({
      where: {
        userId,
      },
    });

    return num > 0 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteRefreshToken = async (token) => {
  try {
    const num = await RefreshToken.destroy({
      where: {
        token,
      },
    });

    return num > 0 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getRefreshToken = async (token) => {
  try {
    const refreshToken = await RefreshToken.findOne({
      where: {
        token,
      },
    });

    if (!refreshToken) {
      return null;
    }

    return refreshToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyRefreshTokenExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

module.exports = {
  generateRefreshToken,
  deleteRefreshTokenByUserId,
  deleteRefreshToken,
  getRefreshToken,
  verifyRefreshTokenExpiration,
};
