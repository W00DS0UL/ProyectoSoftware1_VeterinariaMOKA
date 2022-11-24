'use strict';

let inputUserName = document.getElementById('txtUserName');
let inputUserIdentifier = document.getElementById('txtUserIdentifier');
let inputUserTel = document.getElementById('txtUserTel');
let inputUserLocation = document.getElementById('txtUserLocation');
let inputPetName = document.getElementById('txtPetName');
let inputPetRace = document.getElementById('txtPetRace');
let inputPetSex = document.getElementById('txtSexo');
let inputPetObservations = document.getElementById('txtObservations');

let btnGenerateAppointment = document.getElementById('btnAccept');

btnGenerateAppointment.addEventListener('click', GenerarMascota);

async function GenerarMascota() {
    let userNameInput = inputUserName.value;
    let userNameIdentifier = inputUserIdentifier.value;
    let userTel = inputUserTel.value;
    let userLocation = inputUserLocation.value;

    let petName = inputPetName.value;
    let petRace = inputPetRace.value;
    let petSex= inputPetSex.value;
    let petObservations = inputPetObservations.value;

    let result = null;

    let resp = ValidarDatos(
        userNameInput,
        userNameIdentifier,
        userTel,
        userLocation,
        petName,
        petRace,
        petSex,
        petObservations
    )
    if (resp === true) {
        result = await RegistrarMascota(
            userNameInput,
            userNameIdentifier,
            userTel,
            userLocation,
            petName,
            petRace,
            petSex,
            petObservations
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
                location.href = 'petsList.html';
            });
        }
    }

}

function ValidarDatos(
    pUserNameInput,
    pUserNameIdentifier,
    pUserTel,
    pUserLocation,
    pPetName,
    pPetRace,
    pPetSex,
    pPetObservations
) {

    if (pUserNameInput.trim() === "" || pUserNameInput === null || pUserNameInput === undefined) {
        ImprimirMsjError('Estimado usuario, el nombre es un campo requerido.');
        ResaltarInputInvalido('txtUserName');
        return false;
    }

    if (pUserNameIdentifier.trim() === "" || pUserNameIdentifier === null ||        pUserNameIdentifier === undefined || pUserNameIdentifier.length !== 9 || parseInt(pUserNameIdentifier) === NaN) {
        ImprimirMsjError('Estimado usuario, la cédula es un campo requerido y se debe ingresar una cédula válida.');
        ResaltarInputInvalido('txtUserIdentifier');
        return false;
    }

    if (pUserTel === null || pUserTel.length < 8 || pUserTel.length > 8) {
        ImprimirMsjError('Estimado usuario, el teléfono es un campo requerido y debe ser un número telefónico válido.');
        ResaltarInputInvalido('txtUserTel');
        return false;
    }

    if (pUserLocation.trim() === "" || pUserLocation === null || pUserLocation === undefined) {
        ImprimirMsjError('Estimado usuario, la dirección es un campo requerido.');
        ResaltarInputInvalido('txtUserLocation');
        return false;
    }

    if (pPetName.trim() === "" || pPetName === null || pPetName === undefined) {
        ImprimirMsjError('Estimado usuario, el nombre de la mascota es un campo requerido.');
        ResaltarInputInvalido('petName');
        return false;
    }

    if (pPetRace.trim() === "" || pPetRace === null || pPetRace === undefined) {
        ImprimirMsjError('Estimado usuario, la raza de la mascota es un campo requerido.');
        ResaltarInputInvalido('petRace');
        return false;
    }
    
    if (pPetSex.trim() === "" || pPetSex === null || pPetSex === undefined) {
        ImprimirMsjError('Estimado usuario, la raza de la mascota es un campo requerido.');
        ResaltarInputInvalido('petRace');
        return false;
    }

    if (pPetObservations.trim() === "" || pPetObservations === null || pPetObservations === undefined){
        ImprimirMsjError('Estimado usuario, los motivos de la cita es un campo requerido y solo puede contener letras.');
        ResaltarInputInvalido('motives');
        return false;
    }
    return true;
}

function ImprimirMsjExito(pmensaje) {
    Swal.fire({
        title: 'Éxitoso!',
        text: pmensaje,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function ImprimirMsjError(pmensaje) {
    Swal.fire({
        title: 'Error!',
        text: pmensaje,
        icon: 'error',
        confirmButtonText: 'OK'
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