const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongodb');
const ArticuloSchema = require('../models/Articulo');

const CarritoSchema = Schema ({
//conUsuario, conArticulosCarrito, estaPago
  
    usuario_id: {
        type: String,
        required: true
    },
    estaPago: {
        type: Boolean,
        require: true
    },
    articulos: [ {
        id: {
            type: Schema.ObjectId, 
            ref: 'Articulo'
        },
        cantidad: {
            type: Number,
            req: true
        }
    } ]
});

module.exports = model( 'Carrito', CarritoSchema );