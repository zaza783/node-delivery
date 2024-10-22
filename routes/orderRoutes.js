const express = require('express');
const { createOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/orders', protect).post(createOrder);
router.route('/orders/:id', protect).put(updateOrderStatus);


module.exports = router;