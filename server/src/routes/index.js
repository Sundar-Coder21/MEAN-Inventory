const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const employeeRoutes = require("./employeeRoutes");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// routes
router.use("/user", userRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;
