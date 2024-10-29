const { Schema, model } = require('mongoose');

const ArticuloSchema = Schema ({
    //nombre, img1, img2, img3, img4, img5, descripcion, precio, cantidad
    
        nombre: {
            type: String,
            required: true,
            unique: true
        },
        nombre_corto: {
            type: String,
            required:true,
            unique: true
        },
        img1: {
            type: String,
            require: true
        },
        img2: {
            type: String,
            require: true
        },
        img3: {
            type: String,
            require: true
        },
        img4: {
            type: String,
            require: true
        },
        img5: {
            type: String,
            require: true
        },
        descripcion: {
            type: String,
            require: true
        },
        precio: {
            type: Number,
            require: true
        },
        cantidad: {
            type: Number,
            require: true
        }
    });

    module.exports = model( 'Articulo', ArticuloSchema );