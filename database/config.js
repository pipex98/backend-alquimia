const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect( process.env.DB_CNN );

        console.log('Conexion Exitosa');

    } catch (e) {
        console.log(e);
        throw new error('No se pudo conectar a la BD')
    }
}

module.exports = {
    dbConnection
}