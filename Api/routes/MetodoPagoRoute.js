'use strict';

const express = require('express');
const router = express.Router();
const MetodoPago = require('../models/MetodoPagoModel.js');

//CREATE
router.post('/RegistrarTarjeta', (req, res) => {
    let body = req.body;

    let nuevoMetodoPago = new MetodoPago({
        OwnerName: body.OwnerName,
        CardNumber: body.CardNumber,
        CardExpiration: body.CardExpiration,
        CardType: body.CardType,
        CardCVV: body.CardCVV
    });

    nuevoMetodoPago.save((err, metodosPagoBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la tarjeta, ocurrio el siguiente error: '
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                metodosPagoBD
            });
        }
    });
});

//Lista
router.get('/ListarTarjetas', (req, res) => {
    MetodoPago.find((err, ListaMetodosPagoBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ListaMetodosPagoBD
            });
        }
    });
});

//ELIMINAR
router.post('/EliminarTarjeta',function (req, res) {
    let body = req.body;
    MetodoPago.remove({ _id: body._id }, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se eliminarion de manera correcta',
                result
            });
        }
    });
});

module.exports = router;