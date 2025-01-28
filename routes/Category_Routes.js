const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer_config");
const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../controllers/Category_Controller");

// Create category (with or without image)
router.post("/createcat", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    return addCategory(req, res);
  } else {
    return addCategory(req, res);
  }
});

// Get all categories
router.get("/getallcat", getAllCategory);

// Get a category by ID
router.get("/getonecat/:id", getCategoryById);

// Update category (with or without image)
router.patch("/updatecat/:id", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    return updateCategory(req, res);
  } else {
    return updateCategory(req, res);
  }
});

// Delete category by ID
router.delete("/deletecat/:id", deleteCategoryById);

module.exports = router;