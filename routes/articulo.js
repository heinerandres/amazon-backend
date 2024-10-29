/*
    /api/articulo

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { crearArticulo, obtenerArticulos } = 
    require('../routes/controllers/articulo');



router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre del usuario es obligatorio').not().isEmpty(),
        check('img1', 'La imagen1 es obligatoria').not().isEmpty(),
        check('img2', 'La imagen2 es obligatoria').not().isEmpty(),
        check('img3', 'La imagen3 es obligatoria').not().isEmpty(),
        check('img4', 'La imagen4 es obligatoria').not().isEmpty(),
        check('img5', 'La imagen5 es obligatoria').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ] , 
    crearArticulo );

router.get(
    '/',
    obtenerArticulos
);


module.exports = router;