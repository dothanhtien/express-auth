"use strict";
const { body } = require("express-validator");
const { User } = require("../../../models");

const validate = (method) => {
  switch (method) {
    // handle both create and update user validations
    default: {
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
        body("firstName")
          .trim()
          .isLength({ max: 255 })
          .withMessage("First name cannot be more than 255 characters"),
        body("lastName")
          .trim()
          .isLength({ max: 255 })
          .withMessage("Last name cannot be more than 255 characters"),
        body("dateOfBirth")
          .optional({ checkFalsy: true })
          .isDate()
          .withMessage("Date of birth is invalid"),
        body("phoneNumber")
          .trim()
          .isLength({ max: 255 })
          .withMessage("Phone number cannot be more than 255 characters"),
      ];
    }
  }
};

const checkUserExistsByEmail = async (email) => {
  try {
    const count = await User.count({
      where: {
        email,
      },
    });

    return count > 0 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.create(data);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUsers = async () => {
  try {
    const users = User.findAll();

    if (!users) {
      return null;
    }

    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkUserExistsById = async (id) => {
  try {
    const count = await User.count({
      where: {
        id,
      },
    });

    return count > 0 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUser = async (id, data) => {
  try {
    const num = await User.update(data, {
      where: {
        id,
      },
    });

    return num;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const deleteUser = async (id) => {
  try {
    const num = await User.destroy({
      where: {
        id,
      },
    });

    return num;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  checkUserExistsByEmail,
  createUser,
  getUsers,
  getUserById,
  checkUserExistsById,
  updateUser,
  deleteUser,
  getUserByEmail,
  validate,
};
