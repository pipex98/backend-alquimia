const { response } = require('express');
const Cart = require('../models/Cart');

//add
const addCart = async( req, res = response ) => {

    const newCart = new Cart(req.body)

    try {
          
        const cart = await newCart.save();

        res.status(200).json({
            ok: true,
            cart
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });
    }   
}

//update
const updateCart = async (req, res = response) => {
  
    try {
      const cart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        ok: true,
        cart
      });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
};

//delete
const deleteCart = async( req, res = response) => {

    const uid = req.params.id;
  
    try {
      
      await Cart.findByIdAndDelete(uid);
  
      res.status(200).json({
        ok: true,
        msg: 'El carrito ha sido eliminado'
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

//get cart user
const getCartUser = async( req, res = response ) => {

    const userId = req.params.userId;
  
    try {
      
      const cart = await Cart.findOne({ userId: userId });
  
      res.status(200).json({
        ok: true,
        cart
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

// get all carts
const getCarts = async( req, res = response ) => {

    try {
        const carts = await Cart.find();
        res.status(200).json({
            ok: true,
            carts
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });
    }

}

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getCartUser,
    getCarts
}