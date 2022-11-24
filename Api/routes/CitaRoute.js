'use strict';

const express = require('express');
const router = express.Router();
const Cita = require('../models/CitaModel.js');

//CREATE
router.post('/RegistrarCita', (req, res) => {
    let body = req.body;

    let nuevaCita = new Cita({
        Fecha: body.Fecha,
        OwnerName: body.OwnerName,
        OwnerEmail: body.OwnerEmail,
        OwnerPhone: body.OwnerPhone,
        PetName: body.PetName,
        PetType: body.PetType,
        Motives: body.Motives
    });

    nuevaCita.save((err, citasBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la cita, ocurrio el siguiente error: '
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                citasBD
            });
        }
    });
});

//READ
router.get('/ListarCita', (req, res) => {
    Cita.find((err, ListaCitaBD) => {
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
                ListaCitaBD
            });
        }
    });
});
//Update
router.put('/ModificarCita', function (req, res) {
    let body = req.body;
    Cita.updateOne({ _id: body._id }, {
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
router.post('/EliminarCita', (req, res) => {
    let body = req.body;
    Cita.remove({ _id: body._id }, (err, result) => {
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