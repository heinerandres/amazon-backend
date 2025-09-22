const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect( "mongodb+srv://hesolanoar:1234@heinerscluster.wkqiq.mongodb.net/portafolio_amazon" );

        console.log('DB Online');
    } catch ( error ) {
        console.log( error );
        throw new Error ( error );

    }
}

module.exports = {

    dbConnection
}
