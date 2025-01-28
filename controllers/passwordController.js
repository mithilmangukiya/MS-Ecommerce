const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const generateToken = require('../utils/utils'); 


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }

    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(404).json({ message: 'User not found. Please register.' });
    }

    
    const token = generateToken({ email }, '1h');

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: '"Ecommerce Support" <support@ecommerce.com>',
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(receiver);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, cpassword } = req.body;

    if (!password || !cpassword) {
      return res.status(400).json({ message: 'Please provide password and confirm password' });
    }

    if (password !== cpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Decode token using jwt.verify
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};

module.exports={forgotPassword,resetPassword};