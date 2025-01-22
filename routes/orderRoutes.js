const express = require('express');
const { createOrder, getAllOrders, getOrderById, getMyOrders, updateOrderStatus, deleteOrder, updateAddress } = require('../controllers/orderController');


const router = express.Router();

router.post("/createorder", createOrder);
router.get("/getorders", getAllOrders);
router.get("/getorder/:id", getOrderById);
router.get("/getmyorders/:userId", getMyOrders);
router.patch("/updateorder/:id", updateOrderStatus);
router.delete("/deleteorder/:id", deleteOrder);
router.put("/updateAddress/:id", updateAddress);

module.exports = router;