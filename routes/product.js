/**
* Rutas de productos / Products
* host + /api/products
*/

const { Router } = require('express');
const { validateJwtAndAdmin } = require('../middlewares/validateJwt');
const { 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProduct, 
    getAllProducts 
} = require('../controllers/product');

const router = Router();

//add
router.post('/add', validateJwtAndAdmin, addProduct );

//update
router.put("/update/:id", validateJwtAndAdmin, updateProduct );

//delete
router.delete('/delete/:id', validateJwtAndAdmin, deleteProduct );

//get product
router.get('/find/:id', getProduct );

//get all products
router.get('/', getAllProducts );
  

module.exports = router;