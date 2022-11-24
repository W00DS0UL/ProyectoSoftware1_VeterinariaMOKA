'use strict';

const mongoose = require('mongoose');

const schemaMetodoPago = new mongoose.Schema({
    OwnerName: {
        type: String,
        required: true,
        unique: false
    },
    CardNumber: {
        type: String,
        required: true,
        unique: false
    },
    CardExpiration: {
        type: String,
        required: true,
        unique: false
    },
    CardType: {
        type: String,
        required: true,
        unique: false
    },
    CardCVV: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('MetodoPago', schemaMetodoPago, 'MetodosPago');