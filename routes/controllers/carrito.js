
const { validationResult } = require('express-validator');
const Carrito = require('../../models/Carrito');
const Articulos = require('../../models/Articulo');
const { ObjectId } = require('mongodb');

const obtenerCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({usuario_id: req.body.usuario_id});
        if( carrito == null){
            res.status(201).json({
                ok: true,
                carrito,
                articulos: [],
            });
        }
        else {
            const articulos_ids = carrito.articulos;
            const idArticulosCarrito = articulos_ids.map(item =>  item.id );
            const articulos = await Articulos.find({ _id: { $in: idArticulosCarrito} });
            res.status(201).json({
                ok: true,
                carrito,
                articulos
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const crearCarrito = async (req, res) => {

    try {
        const carrito = new Carrito( req.body );
        await carrito.save();

        const articulos_ids = carrito.articulos;
        const idArticulosCarrito = articulos_ids.map(item =>  item.id );
        const articulos = await Articulos.find({ _id: { $in: idArticulosCarrito} });

        res.status(201).json({
            ok: true,
            carrito,
            articulos
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const pagarCarrito = async (req, res) => {
    const carrito_id = req.body.carrito_id;
    const estaPago = req.body.estaPago;
    await Carrito.updateOne(
        {_id: new ObjectId (carrito_id)},
        {$set: { estaPago: estaPago}}
    ).then(result => {
        if(!result){
            console.log("No se pudo actualizar");
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        }else {
            console.log("se actualizó estaPago");
            res.status(201).json({
                ok: true
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    });
}

const respuestaActualizar = async (req, res) => {
    sobreEscribirArticulosCarrito(req, res).then( async () => {
        const carrito = await Carrito.findOne({_id: new ObjectId(req.body.carrito_id)});
        const articulos_ids = carrito.articulos;
        const idArticulosCarrito = articulos_ids.map(item =>  item.id );
        const articulos = await Articulos.find({ _id: { $in: idArticulosCarrito} });
        res.status(201).json({
            ok: true,
            msg: 'Actualización correcta',
            carrito,
            articulos
        });
    });
}

const sobreEscribirArticulosCarrito = async (req, res) =>{
    const carrito_id = req.body.carrito_id;
    const actualizar = req.body.actualizar;
    const insertar = req.body.insertar;
    const eliminar = req.body.eliminar;
    if(actualizar.length !== 0){
        //actualizar
        await actualizarCarrito(carrito_id, actualizar).then(result =>{
            if(!result){
                console.log("no se actualizaron registros");
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                });
            }else{
                console.log("se actualizaron los registros");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        });
    } if (insertar.length !== 0){
        //insertar
        await insertarArticulosCarrito(carrito_id, insertar).then(result =>{
            if(!result){
                console.log("no se insertaron registros");
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                });
            }else{
                console.log("se insertaron los registros");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        });
    } if (eliminar.length !== 0){
        //eliminar
        await eliminarArticulosCarrito(carrito_id, eliminar).then(result =>{
            if(!result){
                console.log("no se eliminaron registros");
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                });
            }else{
                console.log("se eliminaron los registros");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        });
    }
}

const insertarArticulosCarrito = async(carrito_id, insertar)=>{
    const result = await Carrito.updateOne(
        { _id: new ObjectId(carrito_id)},
        { $push: {articulos: {$each: insertar }}},
        { writeConcern: { w: 'majority'}}
    );
    return result;
};

const eliminarArticulosCarrito = async(carrito_id, eliminar)=> {
    const result = await Carrito.updateOne(
        { _id: new ObjectId(carrito_id)},
        {$pull: {articulos: {id: {$in: eliminar}}}},
        { writeConcern: { w: 'majority'}}
    );
    return result;
};


const actualizarCarrito = async (carrito_id, actualizar) => {
    const filtros = actualizar.map((item, index) => ({
        [`element${index}.id`]: new ObjectId(item.id)
    }));

    const set = actualizar.reduce((acc, item, index) => {
        acc[`articulos.$[element${index}].cantidad`] = item.cantidad;
        return acc;
    }, {});

    const result = await Carrito.updateOne(
        {_id: new ObjectId (carrito_id)},
        {$set: set},
        {arrayFilters: filtros},
        { writeConcern: { w: 'majority'}}
    );
    return result;
}
module.exports = {
    crearCarrito,
    respuestaActualizar,
    sobreEscribirArticulosCarrito,
    pagarCarrito,
    obtenerCarrito
}