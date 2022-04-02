"use strict";

const express = require("express");
const { sequelize } = require("./models");

const app = express();

const PORT = process.env.PORT || 8080;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
