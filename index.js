const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();

//Base de datos
dbConnection();

//body
app.use( express.json() );
app.use(cors());

app.use( '/api/articulo', require('./routes/articulo') );

app.use('/api/carrito', require('./routes/carrito'));

app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`)
})