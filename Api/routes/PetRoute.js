'use strict';

const express = require('express');
const router = express.Router();
const Pet = require('../models/PetModel.js');

//CREATE
router.post('/RegistrarMascota', (req, res) => {
    let body = req.body;

    let nuevoPet = new Pet({
        OwnerName: body.OwnerName,
        OwnerIdentification: body.OwnerIdentification,
        OwnerPhone: body.OwnerPhone,
        OwnerDirection: body.OwnerDirection,
        PetName: body.PetName,
        PetType: body.PetType,
        PetSex: body.PetSex,
        PetObservations: body.PetObservations,
    });

    nuevoPet.save((err, PetsBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la mascota, ocurrio el siguiente error: '
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                PetsBD
            });
        }
    });
});

//READ
router.get('/ListaMascotas', (req, res) => {
    Pet.find((err, ListaPetBD) => {
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
                ListaPetBD
            });
        }
    });
});
//Update
router.put('/ModificarMascota', function (req, res) {
    let body = req.body;
    Pet.updateOne({ _id: body._id }, {
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
router.post('/EliminarMascota', (req, res) => {
    let body = req.body;
    Pet.remove({ _id: body._id }, (err, result) => {
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