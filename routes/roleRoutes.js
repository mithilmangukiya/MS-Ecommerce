const express = require('express');
const router = express.Router();
const  authenticate  = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const { adminDashboard, customerServiceDashboard, customerDashboard, managerDashboard } = require('../controllers/roleController');


router.get('/admin', authenticate, checkRole(['admin']), adminDashboard);
router.get('/customer-service', authenticate, checkRole(['customer_service']), customerServiceDashboard);
router.get('/customer', authenticate, checkRole(['customer']), customerDashboard);
router.get('/manager', authenticate, checkRole(['manager']), managerDashboard);

module.exports = router;

