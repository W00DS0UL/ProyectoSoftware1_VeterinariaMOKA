'use strict';

let botonRegistrarTarjeta = document.getElementById('btnRegistrarTarjeta');
let inputNombreTarjeta = document.getElementById('txtNombreTarjeta');
let inputNumeroTarjeta = document.getElementById('numTarjeta');
let inputNumeroVencimiento = document.getElementById('DateVencimiento');
let inputNumeroCVC = document.getElementById('numCVC');

botonRegistrarTarjeta.addEventListener('click', RegistarDatos);


async function RegistarDatos() {

    let sinputNombreTarjeta = inputNombreTarjeta.value;
    let ninputNumeroTarjeta = inputNumeroTarjeta.value;
    let ninputDateVencimiento = inputNumeroVencimiento.value;
    let ninputNumeroCVC = inputNumeroCVC.value;
    let tipoTarjeta = null;
    let tipoTarjetaMarca = "";

    if (ninputNumeroTarjeta[0] === "3") {
        tipoTarjeta = 1;
        tipoTarjetaMarca = "American Express";
    } else if (ninputNumeroTarjeta[0] === "4") {
        tipoTarjeta = 2;
        tipoTarjetaMarca = "Visa";
    } else if (ninputNumeroTarjeta[0] == "5") {
        tipoTarjeta = 3;
        tipoTarjetaMarca = "Master Card";
    } else {
        tipoTarjeta = 4;
        //NO valida
    }

    let resp = ValidarDatos(sinputNombreTarjeta, ninputNumeroTarjeta, tipoTarjeta, ninputDateVencimiento, ninputNumeroCVC);
    
    let result = null;

    if (resp === true) {
        result = await RegistrarTarjeta(
            sinputNombreTarjeta, 
            ninputNumeroTarjeta, 
            ninputDateVencimiento, 
            tipoTarjetaMarca,
            ninputNumeroCVC

        );

        if (result != null && result.resultado == false) {
            ImprimirMsjError(result.msj);
            console.log(result.msj);
        } else {
            Swal.fire({
                title: 'Registro exitoso',
                text: result.msj,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(res => {
                location.href = 'paymentsList.html';
            });
        }
    }
}


function ValidarDatos(pinputNombreTarjeta, pinputNumeroTarjeta, ptipoTarjeta, pninputDateVencimiento, pinputNumeroCVC) {

    if (pinputNombreTarjeta == '' || pinputNombreTarjeta == null || pinputNombreTarjeta == undefined) {
        ImprimirMsjError('Estimado usuario, el nombre del tarjetahabiente es requerido.');
        ResaltarInputInvalido('txtNombreTarjeta');
        return false;
    }
    if (pinputNumeroTarjeta == '' || pinputNumeroTarjeta == null || pinputNumeroTarjeta == undefined) {
        ImprimirMsjError('Estimado usuario, el número de tarjeta es requerido.');
        ResaltarInputInvalido('numTarjeta');
        return false;
    }
    if (ptipoTarjeta == 1 && pinputNumeroTarjeta.length != 15) {
        ImprimirMsjError('Estimado usuario, las tarjetas American Express deben estar compuestas por 15 dígitos.');
        ResaltarInputInvalido('numTarjeta');
        return false;
    }
    if (ptipoTarjeta == 2 && pinputNumeroTarjeta.length != 16) {
        ImprimirMsjError('Estimado usuario, las tarjetas Visa deben estar compuestas por 16 dígitos.');
        ResaltarInputInvalido('numTarjeta');
        return false;
    }
    if (ptipoTarjeta == 3 && pinputNumeroTarjeta.length != 16) {
        ImprimirMsjError('Estimado usuario, las tarjetas MasterCard deben estar compuestas por 16 dígitos.');
        ResaltarInputInvalido('numTarjeta');
        return false;
    }
    if (ptipoTarjeta == 4) {
        ImprimirMsjError('Estimado usuario, este tipo de tarjeta no es permitido.');
        ResaltarInputInvalido('numTarjeta');
        return false;
    }

    if (pninputDateVencimiento == '' || pninputDateVencimiento == null || pninputDateVencimiento == undefined) {
        ImprimirMsjError('Estimado usuario, la fecha de vencimiento de la tarjeta es requerida.');
        ResaltarInputInvalido('DateVencimiento');
        return false;
    }
    if (pninputDateVencimiento.length < 4) {
        ImprimirMsjError('Estimado usuario, indique una fecha válida.');
        ResaltarInputInvalido('DateVencimiento');
        return false;
    }
    if (pinputNumeroCVC == '' || pinputNumeroCVC == null || pinputNumeroCVC == undefined) {
        ImprimirMsjError('Estimado usuario, el CVC es requerido.');
        ResaltarInputInvalido('numCVC');
        return false;
    }
    if (ptipoTarjeta == 1 && pinputNumeroCVC.length != 4) {
        ImprimirMsjError('Estimado usuario, el CVC debe contener 4 dígitos.');
        ResaltarInputInvalido('numCVC');
        return false;
    }
    if ((ptipoTarjeta == 2 || ptipoTarjeta == 3) && pinputNumeroCVC.length != 3) {
        ImprimirMsjError('Estimado usuario, el CVC debe contener 3 dígitos.');
        ResaltarInputInvalido('numCVC');
        return false;
    }
    if (isNaN(pinputNumeroCVC) == true) {
        ImprimirMsjError('Estimado usuario, el CVC permite solamente formato numérico.');
        ResaltarInputInvalido('numCVC');
        return false;
    }
    return true;

}

inputNumeroVencimiento.addEventListener('input', function () {
    let number = inputNumeroVencimiento.value
    let currentTime = new Date();
    let thisYear = currentTime.getFullYear()

    if (number.length == 2) {
        inputNumeroVencimiento.value = `${number} / `;
    }
    else if (number.length == 4) {
        inputNumeroVencimiento.value = '';
    }
    else if (number.length == 9) {
        let saveDateExpiration = inputNumeroVencimiento.value;
        let dayExp = saveDateExpiration.slice(0, 2);
        let yearExp = saveDateExpiration.slice(5, 9);
        if (yearExp < thisYear) {
            ImprimirMsjError('Estimado usuario, el año de vencimiento de su tarjeta es incorrecto.');
        }
        if (dayExp > 12) {
            ImprimirMsjError('Estimado usuario, la fecha de expiración de su tarjeta es incorrecta.');
        }
    }
});

function ImprimirMsjError(pmensaje) {
    Swal.fire({
        title: 'Error!',
        text: pmensaje,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}
function ResaltarInputInvalido(pInputId) {
    let elementoLabel = document.getElementById(pInputId);
    let styleOrigin = elementoLabel.style;

    elementoLabel.style = 'border: 1px solid red;';
    setTimeout(function () {
        elementoLabel.style = styleOrigin;
    }, 5000);
}
