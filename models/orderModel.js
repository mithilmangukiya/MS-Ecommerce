const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Order', orderSchema);
