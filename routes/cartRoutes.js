const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify logged-in user

// Add to Cart
router.post('/add', authMiddleware, cartController.addToCart);

// Update Cart Item
router.put('/update', authMiddleware, cartController.updateCartItem);

// Delete Cart Item
router.delete('/delete', authMiddleware, cartController.deleteCartItem);

module.exports = router;
