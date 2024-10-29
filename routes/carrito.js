/*
    /api/carrito

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { crearCarrito, respuestaActualizar, pagarCarrito, obtenerCarrito } = 
    require('../routes/controllers/carrito');



router.post( 
    '/insertar', 
    crearCarrito );

router.put(
    '/actualizarCarrito',
    respuestaActualizar
);

router.put(
    '/pagarCarrito',
    pagarCarrito
)

router.post(
    '/obtenerCarrito',
    obtenerCarrito
)



module.exports = router;