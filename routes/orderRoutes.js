const express = require('express');
const { createOrder, getAllOrders, getOrderById, getMyOrders, updateOrderStatus, deleteOrder, updateAddress } = require('../controllers/orderController');
const authmiddleWare = require('../middleware/authMiddleware')
const { checkRole } = require('../middleware/roleMiddleware');


const router = express.Router();

router.post("/createorder", authmiddleWare, createOrder);
router.get("/getorders",authmiddleWare, checkRole(['admin']), getAllOrders);
router.get("/getorder/:id",authmiddleWare, getOrderById);
router.get("/getmyorders/:userId",authmiddleWare, checkRole(['customer']), getMyOrders);
router.patch("/updateorder/:id",authmiddleWare, updateOrderStatus);
router.delete("/deleteorder/:id",authmiddleWare, deleteOrder);
router.put("/updateAddress/:id",authmiddleWare, updateAddress);

module.exports = router;