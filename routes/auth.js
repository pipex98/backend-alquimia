/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

router.post('/register', createUser )

router.post('/login', loginUser )
 
router.get('/renew', validateJwt, revalidateToken)
 
module.exports = router;