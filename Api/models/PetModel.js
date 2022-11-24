'use strict';

const mongoose = require('mongoose');

const schemaPet = new mongoose.Schema({
    OwnerName: {
        type: String,
        required: true,
        unique: false
    },
    OwnerIdentification: {
        type: String,
        required: true,
        unique: false
    },
    OwnerPhone: {
        type: String,
        required: true,
        unique: false
    },
    
    OwnerDirection: {
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

    PetSex: {
        type: String,
        required: true,
        unique: false
    },
    
    PetObservations: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('Pet', schemaPet, 'Pets');