const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const orderCtrl = require('../controllers/order')

router.post('/', auth, orderCtrl.orderItem)

module.exports = router