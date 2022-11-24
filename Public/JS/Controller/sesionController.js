'use strict';

IdentificarUsuarioLogueado();
function IdentificarUsuarioLogueado() {
    let result = GetSesionActiva();

    if (result != null) {
        document.getElementById('userNameIndex').innerHTML =
            result.Nombre;
    }
}

function CerrarSesion() {
    LimpiarSesionActiva();
    location.href = 'index.html';
}