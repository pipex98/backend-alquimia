/**
 * Rutas de pago / payment
 * host + /api/checkout
 */


const router = require('express').Router();
const { payment } = require('../controllers/payment');

router.post('/payment', payment)

module.exports = router;