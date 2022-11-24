'use strict';

const express = require('express');
const router = express.Router();
const Reservacion = require('../models/ReservacionModel');

//CREATE
router.post('/RegistrarReservacion', (req, res) => {
    let body = req.body;

    let nuevaReserva = new Reservacion({
        Room: body.Room,
        DateEntrada: body.DateEntrada,
        DateSalida: body.DateSalida,
        NombreMascota: body.NombreMascota,
        Raza: body.Raza,
        Alimento: body.Alimento,
        Sexo: body.Sexo,
        NombrePropietario: body.NombrePropietario,
        EmailPropietario: body.EmailPropietario,
        Telefono: body.Telefono,
        Servicios: body.Servicios
    });

    nuevaReserva.save((err, reservacionesDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la reservación, ocurrio el siguiente error: '
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                reservacionesDB
            });
        }
    });
});
//READ
router.get('/ListarReservacion', (req, res) => {
    Reservacion.find((err, ListaReservacionBD) => {
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
                ListaReservacionBD
            });
        }
    });
});
//UPDATE
router.put('/ModificarReserva', function (req, res) {
    let body = req.body;
    Reservacion.updateOne({ _id: body._id }, {
        $set: req.body
    }, function (err, info) {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error no se pudo actualizar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se actualizaron de forma correcta',
                info
            });
        }
    }
    );
});
//Delete
router.delete('/EliminarReserva', function (req, res) {
    let body = req.body;
    Reservacion.remove({ _id: body._id }, (err, result) => {
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
