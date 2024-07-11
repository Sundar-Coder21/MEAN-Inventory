// src/models/index.js

const Inventory = require("./inventory");
const user = require("./userModel");
const employee = require("./employee");

module.exports = {
  user,
  Inventory,
  employee,
};
