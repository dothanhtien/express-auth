"use strict";
const {
  getUsers,
  createUser,
  checkUserExistsByEmail,
  getUserById,
  updateUser,
  checkUserExistsById,
  deleteUser,
} = require("../../services/users");

exports.createUser = async (req, res) => {
  const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
    req.body;

  // validation will be implemented later

  const isExist = await checkUserExistsByEmail(email);

  if (isExist) {
    return res.status(400).send({
      status: "error",
      message: "Email already exists in the system",
    });
  }

  const user = await createUser({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
  });

  if (!user) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }

  res.status(201).send({
    status: "success",
    data: user,
  });
};

exports.getUsers = async (req, res) => {
  const users = await getUsers();

  if (!users) {
    return res.status(500).send({
      status: "error",
      error: "Something went wrong",
    });
  }

  res.send({
    status: "success",
    data: users,
  });
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).send({
      status: "error",
      message: "User does not exists",
    });
  }

  res.send({
    status: "success",
    data: user,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
    req.body;

  // check if user does not exist
  const user = await getUserById(id);

  if (!user) {
    return res.status(404).send({
      status: "error",
      message: "User does not exists",
    });
  }

  // check if email in req.body already in the system
  const isExist = await checkUserExistsByEmail(email);

  // skip this statement if no change in the email
  if (user.email !== email && isExist) {
    return res.status(400).send({
      status: "error",
      message: "Updated email already exists in the system",
    });
  }

  // remove undefined properties to include in the response
  const updates = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
  };

  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) {
      delete updates[key];
    }
  });

  const num = await updateUser(id, updates);

  if (!num) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }

  res.send({
    status: "success",
    data: {
      ...user.dataValues,
      ...updates,
    },
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  // check if user does not exist
  const isExist = await checkUserExistsById(id);

  if (!isExist) {
    return res.status(404).send({
      status: "error",
      message: "User does not exists",
    });
  }

  const num = await deleteUser(id);

  if (!num) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }

  res.send({
    status: "success",
    message: "User deleted successfully",
  });
};
