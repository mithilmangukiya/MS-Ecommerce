const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  // parentCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 
  //   default: null,
  // },
  status: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
  },

},
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
