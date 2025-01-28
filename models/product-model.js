const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Category',
  },
  images: {
    type: Buffer,
    required: false,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  attributes: [{
    key: String,
    value: String,
   }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);


