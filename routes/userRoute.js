const express = require("express");
const router = express.Router();
const { signup, signin, updateUser, getProfile, deleteUser } = require('../controllers/userController')
const authenticate = require('../middleware/authMiddleware');

// Signup Route
router.post("/signup", signup);

// Signin Route
router.post("/signin", signin);

//get profile
router.get('/profile/', authenticate,getProfile); 

// Update User Profile 
router.patch("/profile/:id", authenticate, updateUser);

// Delete User 
router.delete("/delete/:id", authenticate,deleteUser);

module.exports = router;
