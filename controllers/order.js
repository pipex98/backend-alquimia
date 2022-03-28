const { response } = require('express');
const Order = require('../models/Order');

//add
const addOrder = async( req, res = response ) => {

    const newOrder = new Order(req.body)

    try {
        
        const order = await newOrder.save();

        res.status(200).json({
            ok: true,
            order
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });
    }

}

//update
const updateOrder = async( req, res = response ) => {

    try {

        const order = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          ok: true,
          order
        });
        
      } catch (err) {
        console.log(err);
        res.status(500).json({
          ok: false,
          msg: 'Porfavor hable con el administrador'
        });
      }
}

//delete
const deleteOrder = async( req, res = response ) => {

    const uid = req.params.id;
  
    try {
      
      await Order.findByIdAndDelete(uid);
  
      res.status(200).json({
        ok: true,
        msg: 'La orden ha sido eliminada'
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

//get user orders
const getUserOrders = async( req, res = response ) => {

    const userId = req.params.userId;
  
    try {
      
      const order = await Order.find({ userId: userId });
  
      res.status(200).json({
        ok: true,
        order
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }

}

// get all orders
const getAllOrders = async( req, res = response ) => {
    
    try {

        const orders = await Order.find();

        res.status(200).json({
            ok: true,
            orders
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });
    }
}

// get monthly income
const getMonthlyIncome = async(req, res = response) => {
 
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    
    const income = await Order.aggregate([
      { $match: { 
        createdAt: { $gte: previousMonth }, 
        ...(productId && {
        products: { $elemMatch: { productId } }
        }), 
      }, 
    },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount'
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    
    res.status(200).json({
      ok: true,
      income
    })

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Porfavor hable con el administrador'
    })
  }

}

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getUserOrders,
    getAllOrders,
    getMonthlyIncome
}