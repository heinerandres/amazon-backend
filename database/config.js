const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect( "mongodb+srv://hesolanoar:8581543@heinerscluster.wkqiq.mongodb.net/portafolio_amazon" );

        console.log('DB Online');
    } catch ( error ) {
        console.log( error );
        throw new Error ( 'Error a la hora de inicializar la BD' );

    }
}

module.exports = {

    dbConnection
}