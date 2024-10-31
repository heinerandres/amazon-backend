const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();

//Base de datos
dbConnection();

//body
try{
    app.use( express.json() );
    app.use(cors());

    app.use(express.static('public'));

    app.use( '/api/articulo', require('./routes/articulo') );

    app.use('/api/carrito', require('./routes/carrito'));

    app.use('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
    
    app.use('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    app.listen( 8080, () => {
        console.log(`Servidor en puerto ${8080}`)
    });
}
catch(error){
    console.log( error );
    throw new Error ( 'Error a la hora de inicializar la BD' );
}
