const router = require('express').Router();
const {createOrder} = require('../controllers/ordersControllers')

router.post('/',createOrder)

module.exports = router