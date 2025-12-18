const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* CREATE USER */
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* GET ALL USERS */
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* UPDATE USER (PUT) */
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "User update failed" });
  }
});

/* DELETE USER */
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "User deletion failed" });
  }
});

module.exports = router;
