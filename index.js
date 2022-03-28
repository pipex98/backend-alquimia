const express = require("express");
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors')

const app = express();

dbConnection();

//Lectura y parseo del body
app.use(express.json());

//cors
app.use(cors());

//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/products', require('./routes/product'))
app.use('/api/carts', require('./routes/cart'))
app.use('/api/orders', require('./routes/order'))
app.use('/api/checkout', require('./routes/payment'))

app.listen( process.env.PORT || 5000, () => {
    console.log('Backend server esta corriento!');
});

