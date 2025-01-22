const Wishlist = require("../models/Wishlist.js");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  
  try {
    const newItem = new Wishlist({ userId, productId });
    await newItem.save();
    res.status(200).json({ message: "Item added to wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error adding to wishlist" });
  }
};

// Get wishlist
exports.getWishlist = async (req, res) => {
 

  try {
    const wishlist = await Wishlist.find();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist" });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  
  try {
    await Wishlist.deleteOne({ productId });
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error removing from wishlist" });
  }
};
