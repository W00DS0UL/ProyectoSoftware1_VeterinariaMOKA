'use strict';
let apiUrl = 'http://localhost:3000/api';

function ObtenerEstado(pEstadoReservacion) {
    switch (Number(pEstadoReservacion)) {
        case 1:
            return 'Pendiente';
        case 2:
            return 'Cancelado';
        default:
            return 'Reservado';
    }
}


function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
        ].join(':')
    );
}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}