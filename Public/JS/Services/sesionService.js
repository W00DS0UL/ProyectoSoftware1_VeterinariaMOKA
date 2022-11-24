'use strict';

function GetSesionActiva() {
    let datosSesionActiva;
    if (localStorage.getItem('datosSesionActiva') == null || localStorage.getItem('datosSesionActiva') == '' || localStorage.getItem('datosSesionActiva') == undefined) {
        datosSesionActiva = [];
    } else {
        datosSesionActiva = JSON.parse(localStorage.getItem('datosSesionActiva'));
    }
    return datosSesionActiva;
}

function LimpiarSesionActiva(){
    localStorage.removeItem('datosSesionActiva');
}