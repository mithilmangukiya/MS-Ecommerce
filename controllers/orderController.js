const Order = require('../models/orderModel');
const sendEmail = require('../utils/email');

const createOrder = async (req, res) => {
    const { userId, products, totalAmount, shippingAddress } = req.body;

    try {
        const newOrder = new Order({ userId, products, totalAmount, shippingAddress });
        await newOrder.save();

        const emailSubject = `Order Confirmation - order id: ${newOrder._id}`;
        const emailBody = `
        <h1>Thank You For Your Order!</h1>
        <p> Your order has been placed successfully. Here are the details:</p>
        <ul>
            <li><strong>Order ID: ${newOrder._id}</li>
            <li><strong>Order Date: ${newOrder.createdAt}</li>
            <li><strong>Order Amount: ${newOrder.totalAmount} Rs.</li>
        </ul>
        <h3>Shipping Address</h3>
        <p>
        ${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}, ${shippingAddress.country} 
        </P>
        <h3>Order Details</h3>
        ${products.map(
            (item) => `
            <li>
            <strong>Product Id: ${item.productId}</strong><br />
            <strong>Quantity: ${item.quantity}</strong>
            <li>`
        ).join('')}
        <p> We will notify you when your order is shipped.</p>
        <p>Thank you for shopping with us!</p>`

        await sendEmail("", emailSubject, emailBody);

        res.status(201).json({ message: "Order created successfully", newOrder });
    }
    catch (error) {
        res.status(500).json({ message: "Order creation failed", error });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ message: "All orders", orders });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get orders", error });
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        res.status(200).json({ message: "Order found", order });
    }
    catch (error) {
        res.status(500).json({ message: "Order not found", error });
    }
}

const getMyOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId });
        res.status(200).json({ message: "My orders", orders });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get orders", error });
    }
}

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);
        order.status = status;
        await order.save();
        res.status(200).json({ message: "Order status updated", order });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update order status", error });
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: "Order deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete order", error });
    }
}

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { street, city, state, zipcode, country } = req.body;

    const order = await Order.findById(id)

    if (!order)
        return res.status(404).json({ message: "ouder not found" });

    try {
        order.shippingAddress = {
            street: street || order.shippingAddress.street,
            city: city || order.shippingAddress.city,
            state: state || order.shippingAddress.state,
            zipcode: zipcode || order.shippingAddress.zipcode,
            country: country || order.shippingAddress.country,
        }
        await order.save()
        res.status(200).json({ message: "Order address updated", order });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update order address", error });
    }
}

module.exports = { createOrder, getAllOrders, getOrderById, getMyOrders, updateOrderStatus, deleteOrder, updateAddress };