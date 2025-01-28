const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/utils");

// Signup 
const signup = async (req, res) => {
  try {
    const { username, email, password, role, address } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are mandatory." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      address,
    });

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      email: user.email,
      username: user.username,
      role: user.role,
      id: user._id,
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      message: "Login success",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User profile
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.userData.id !== userId && req.userData.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update this user." });
    }

    const { username, email, password, address } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); 
    if (address) user.address = address;

    const updatedUser = await user.save();
    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete user 
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "User account deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ message: "Account deletion failed", error: error.message });
  }
};

module.exports = { signup, signin, updateUser, deleteUser, getProfile };
