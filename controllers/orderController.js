const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    const { customerName, deliveryAddress } = req.body;

    try {
        const order = new Order({ customerName, deliveryAddress });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateOrderStatus = async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!order) {
        return next('No order found with that ID', 404);
    }

    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    });
};