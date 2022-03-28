/**
 * Rutas de carrito / Cart
 * host + /api/cart
 */

const { Router } = require('express');
const { validateJwt, validateJwtAndAuthorization } = require('../middlewares/validateJwt');
const { addCart, updateCart, deleteCart, getCarts, getCartUser } = require('../controllers/cart');

const router = Router();


router.post('/add', addCart );

router.put('/update/:id', validateJwt, updateCart);

router.delete('/delete/:id', validateJwtAndAuthorization, deleteCart);

router.get('/find/:userId', validateJwtAndAuthorization, getCartUser);

router.get('/', validateJwtAndAuthorization, getCarts);
 
 module.exports = router;