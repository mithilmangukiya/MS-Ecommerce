const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/passwordController');
const router = express.Router();


router.post('/forgot-password', forgotPassword);

router.get('/reset-password/:token', (req, res) => {
    const token = req.params.token; 
    res.render('reset_password', { token }); 
});


router.post('/reset-password/:token', resetPassword);

module.exports = router;
