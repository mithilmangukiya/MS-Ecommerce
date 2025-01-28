const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_GMAIL, 
    pass: process.env.MY_PASSWORD, 
  },
});


const sendEmail = async (to, subject, html, from = '"Ecommerce Support" <support@ecommerce.com>') => {
  try {
    const mailOptions = { from, to, subject, html };
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
