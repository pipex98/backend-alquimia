const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    let user = new User( req.body );

    try {

        user.password = await bcrypt.hash(req.body.password, 12);
        
        await user.save();
    
        res.json({
            ok: true,
            uid: user._id,
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            msg: 'El usuario ha sido creado'
        })

    } catch (e) {
        console.log(e);
        res.json({
           ok: false,
           msg: 'Porfavor hable con el administrador'
        })
    }
}

const loginUser = async (req, res = response) => {

    const { username, password } = req.body   
    
    try {
        
        const user = await User.findOne({ username });

        !user && res.status(401).json({
            ok: false,
            msg: 'Credenciales incorrectas'
        })

        if (!bcrypt.compareSync(password,user.password)) {
            res.status(401).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        }

        const token = await generateJWT( user._id, user.username, user.isAdmin )

        res.status(200).json({
            ok: true,
            uid: user._id,
            username: user.username,
            password: user.password,
            isAdmin: user.isAdmin,
            token
        })

    } catch (e) {
        console.log(e);
        res.json({
           ok: false,
           msg: 'Porfavor hable con el administrador'
        })
    }
}

const revalidateToken = async(req, res = response) => {

    const { uid, username, isAdmin } = req;

    const token = await generateJWT(uid, username, isAdmin);

    res.json({
        ok: true,
        uid,
        username,
        isAdmin,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}