const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'customer', 'customer_service'],
    default: 'customer',
  },
  address: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },


});

module.exports = mongoose.model('User', userSchema);
