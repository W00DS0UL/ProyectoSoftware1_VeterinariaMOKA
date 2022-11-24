'use strict';
const mongoose = require('mongoose');

const schemaReservacion = new mongoose.Schema({
    Room: { type: String, required: true, unique: true },
    DateEntrada: { type: String, required: true, unique: false },
    DateSalida: { type: String, required: true, unique: false },
    NombreMascota: { type: String, required: true, unique: true },
    Raza: { type: String, required: true, unique: false },
    Alimento: { type: String, required: true, unique: false },
    Sexo: { type: String, required: true, unique: false },
    NombrePropietario: { type: String, required: true, unique: true },
    EmailPropietario: { type: String, required: true, unique: true },
    Telefono: { type: String, required: true, unique: false },
    Servicios: { type: Array, required: false, unique: false },
});

module.exports = mongoose.model('Reservacion', schemaReservacion, 'Reservaciones');