const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = ( req, res = response, next ) => {
    
    const token = req.header('x-token'); 

    if (token) {

        jwt.verify(token, process.env.SECRET_JWT_SEED, (err, user) => {
            if (err) res.status(401).json({
                ok: false,
                msg: 'Token no es valido!'
            });
            req.uid = user.uid,
            req.username = user.username,
            req.isAdmin = user.isAdmin,
            next();
        })
    } else {
        return res.status(401).json({
            ok: false,
            msg: 'No estas autenticado!'
        });
    }
}

const validateJwtAndAuthorization = ( req, res, next ) => {
    validateJwt(req, res, () => {
        if (req.uid === req.params.id || req.isAdmin) {
            next();
        } else {
            res.status(403).json({
                ok: false,
                msg: 'no tienes permitido hacer eso!'
            })
        }
    })
}

const validateJwtAndAdmin = ( req, res, next ) => {
    validateJwt(req, res, () => {   
        if (req.isAdmin) {
            next();
        } else {
            res.status(403).json({
                ok: false,
                msg: 'no tienes permitido hacer eso!'
            })
        }
    })
}

module.exports = {
    validateJwt,
    validateJwtAndAuthorization,
    validateJwtAndAdmin
}