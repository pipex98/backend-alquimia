const { response } = require('express');
const Product = require('../models/Product');

const addProduct = async(req, res = response) => {

    const newProduct = new Product(req.body)

    try {
        
        const product = await newProduct.save();

        res.status(200).json({
            ok: true,
            product,
            msg: 'El producto se ha guardado correctamente'
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });
    }
}

const updateProduct = async(req, res = response) => {
    
    try {

        const product = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          ok: true,
          product,
          msg: 'El producto se ha actualizado correctamente'
        });
        
      } catch (err) {
        console.log(err);
        res.status(500).json({
          ok: false,
          msg: 'Porfavor hable con el administrador'
        });
      }
}

const deleteProduct = async(req, res = response) => {
    
    const uid = req.params.id;
  
    try {
      
      await Product.findByIdAndDelete(uid);
  
      res.status(200).json({
        ok: true,
        msg: 'El producto ha sido eliminado'
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

const getProduct = async(req, res = response) => {
    
    const uid = req.params.id;
  
    try {
      
      const product = await Product.findById(uid);
  
      res.status(200).json({
        ok: true,
        product
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

const getAllProducts = async(req, res = response) => {
 
    const qNew = req.query.new;
    const qCategory = req.query.category;
  
    try {
      
      let products;

      if (qNew) {
          products = await Product.find().sort({createdAt: -1}).limit(1);
      } else if(qCategory) {
          products = await Product.find({
              categories: {
                $in: [qCategory],
              },
          });
      } else {
          products = await Product.find();
      }
  
      res.status(200).json({
        products
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}

