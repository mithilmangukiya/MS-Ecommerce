const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController.js');

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/", getWishlist);
router.delete("/remove/:id", removeFromWishlist);

module.exports = router;
