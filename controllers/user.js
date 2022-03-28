const { response } = require('express');
const User = require("../models/User");
const bcrypt = require('bcrypt');

const updateUser = async (req, res = response) => {

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    try {

      const user = await User.findByIdAndUpdate(

        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      );

      res.status(200).json({
        ok: true,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        msg: 'El usuario ha sido actualizado'
      });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {
      
      await User.findByIdAndDelete(uid);
  
      res.status(200).json({
        ok: true,
        msg: 'El usuario ha sido eliminado'
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      })
    }
}

const getUser = async (req, res = response) => {

    const uid = req.params.id;

    try {
        
        const user = await User.findById(uid);

        res.status(200).json({
        ok: true,
        uid: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
        })
    }
}

const getAllUsers = async (req, res = response) => {

    const query = req.query.new;

    try {
      
      const users = query ? await User.find().sort({ _id: -1 }).limit(5) 
      : await User.find();
  
      res.status(200).json({
        users
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      })
    }

}

const getUserStats = async (req, res = response) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      
      const data = await User.aggregate([
       { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' }
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        }
      ]);
    
      res.status(200).json(data);

    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'Porfavor hable con el administrador'
      });
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
}