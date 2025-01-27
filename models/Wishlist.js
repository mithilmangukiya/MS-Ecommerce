const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  
  productId: { type: String, required: true },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
