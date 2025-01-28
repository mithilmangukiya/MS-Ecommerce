const Cart = require('../models/cart.js');
const Product = require('../models/product-model.js');

// Add to Cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user?._id; // Extract user ID from logged-in user

    if (!userId) return res.status(401).json({ message: 'User not authenticated' });
    if (!productId || !quantity) return res.status(400).json({ message: 'Product ID and quantity are required' });

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
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            const newQuantity = cart.items[itemIndex].quantity + quantity;
            if (product.stock < newQuantity)
                return res.status(400).json({ message: 'Insufficient stock for the requested quantity' });
            cart.items[itemIndex].quantity = newQuantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        // Save Cart and Update Product Stock
        await cart.save();
        product.stock -= quantity;
        await product.save();

        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (err) {
        console.error('Error adding to cart:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Cart Item
exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user?._id; // Extract user ID from logged-in user

    if (!userId) return res.status(401).json({ message: 'User not authenticated' });
    if (!productId || !quantity) return res.status(400).json({ message: 'Product ID and quantity are required' });

    try {
        // Find the cart
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        // Validate Product Stock
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const currentQuantity = cart.items[itemIndex].quantity;
        if (product.stock + currentQuantity < quantity)
            return res.status(400).json({ message: 'Insufficient stock for update' });

        // Update Cart and Product Stock
        product.stock += currentQuantity - quantity;
        cart.items[itemIndex].quantity = quantity;

        await product.save();
        await cart.save();

        res.status(200).json({ message: 'Cart item updated', cart });
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete Cart Item
exports.deleteCartItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?._id; // Extract user ID from logged-in user

    if (!userId) return res.status(401).json({ message: 'User not authenticated' });
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    try {
        // Find the cart
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        // Restore Product Stock
        const product = await Product.findById(productId);
        if (product) {
            product.stock += cart.items[itemIndex].quantity;
            await product.save();
        }

        // Remove Item from Cart
        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({ message: 'Cart item deleted', cart });
    } catch (err) {
        console.error('Error deleting cart item:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
