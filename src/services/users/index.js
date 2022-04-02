"use strict";
const { User } = require("../../../models");

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

module.exports = {
  checkUserExistsByEmail,
  createUser,
  getUsers,
  getUserById,
  checkUserExistsById,
  updateUser,
  deleteUser,
};
