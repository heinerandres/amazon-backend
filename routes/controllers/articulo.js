const { validationResult } = require('express-validator');
const Articulo = require('../../models/Articulo');

const crearArticulo = async (req, res) => {

    try{
        const articulo = new Articulo( req.body );
        await articulo.save();

        res.status(201).json({
            ok: true,
            articulo
        });
    }
    catch(error){
        console.log("no se pudo guardar el articulo");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const obtenerArticulos = async (req, res) => {
    try{
        const articulos = await Articulo.find({});
        res.status(201).json({
            ok: true,
            articulos
        });
    }
    catch(error){
        console.log("no se pudieron obtener los articulos");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


module.exports = {
    crearArticulo,
    obtenerArticulos
}