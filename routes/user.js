/**
 * Rutas de Usuarios / Users
 * host + /api/users
 */

const { 
    updateUser, 
    deleteUser, 
    getUser, 
    getAllUsers, 
    getUserStats 
} = require("../controllers/user");
const { 
    validateJwtAndAuthorization, 
    validateJwtAndAdmin 
} = require("../middlewares/validateJwt");

const router = require("express").Router();

//update
router.put("/update/:id", validateJwtAndAuthorization, updateUser);

//delete
router.delete('/delete/:id', validateJwtAndAuthorization, deleteUser);

//get user
router.get('/find/:id', validateJwtAndAdmin, getUser );

//get all users
router.get('/', validateJwtAndAdmin, getAllUsers );

//get user stats
router.get('/stats', validateJwtAndAdmin, getUserStats );


module.exports = router;