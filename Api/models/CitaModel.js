'use strict';

const mongoose = require('mongoose');

const schemaCita = new mongoose.Schema({
    Fecha: {
        type: String,
        required: true,
        unique: true
    },

    OwnerName: {
        type: String,
        required: true,
        unique: false
    },
    OwnerEmail: {
        type: String,
        required: true,
        unique: false
    },
    OwnerPhone: {
        type: String,
        required: true,
        unique: false
    },

    PetName: {
        type: String,
        required: true,
        unique: false
    },
    PetType: {
        type: String,
        required: true,
        unique: false
    },

    Motives: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('Cita', schemaCita, 'Citas');