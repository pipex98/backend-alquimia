/**
 * Rutas de pedidos / Orders
 * host + /api/orders
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { 
    addOrder, 
    updateOrder, 
    deleteOrder, 
    getUserOrders, 
    getAllOrders, 
    getMonthlyIncome 
} = require('../controllers/order');
const { validateFields } = require('../middlewares/validateFields');
const { 
    validateJwt, 
    validateJwtAndAuthorization, 
    validateJwtAndAdmin 
} = require('../middlewares/validateJwt');

const router = Router();

router.post('/add', validateJwt, addOrder );

router.put('/update/:id', validateJwtAndAdmin, updateOrder);

router.put('/delete/:id', validateJwtAndAdmin, deleteOrder);

router.get('/find/:userId', validateJwtAndAuthorization, getUserOrders );

router.get('/', validateJwtAndAdmin, getAllOrders);

router.get('/income', validateJwtAndAdmin, getMonthlyIncome );
 
 
module.exports = router;