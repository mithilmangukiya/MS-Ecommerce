const Cart = require('../models/cart.js');
const Product = require('../models/product.js');

// Add to Cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Validate Product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.stock < quantity)
            return res.status(400).json({ message: 'Insufficient stock' });

        // Find or Create Cart
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        // Update or Add Item
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        // Update Product Stock
        product.stock -= quantity;
        await product.save();

        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Cart Item
exports.updateCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        // Validate stock for the updated quantity
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const currentQuantity = cart.items[itemIndex].quantity;
        if (product.stock + currentQuantity < quantity)
            return res.status(400).json({ message: 'Insufficient stock for update' });

        // Update stock and cart
        product.stock += currentQuantity - quantity;
        cart.items[itemIndex].quantity = quantity;

        await product.save();
        await cart.save();

        res.status(200).json({ message: 'Cart item updated', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete Cart Item
exports.deleteCartItem = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        // Restore product stock
        const product = await Product.findById(productId);
        if (product) {
            product.stock += cart.items[itemIndex].quantity;
            await product.save();
        }

        // Remove item from cart
        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({ message: 'Cart item deleted', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
