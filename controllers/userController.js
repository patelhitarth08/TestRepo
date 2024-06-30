// controllers/homeController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(201).json({ message: "User Not Found" });
    }
    console.log(process.env.SECRET_KEY);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    console.log(token);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(201).json({ message: "User Not Found" });
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(201).json({ message: "User Not Found" });
    }
    user.username = username;
    user.password = password;
    await user.save();
    res.status(201).json({ user, message: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(201).json({ message: "User Not Found" });
    }
    res.status(201).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
