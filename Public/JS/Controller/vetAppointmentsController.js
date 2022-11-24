'use strict';

let inputDateAppointment = document.getElementById('dateAppointment');
let inputUserName = document.getElementById('userName');
let inputUserEmail = document.getElementById('userEmail');
let inputUserTel = document.getElementById('userTel');
let inputPetName = document.getElementById('petName');
let inputPetRace = document.getElementById('petRace');
let inputMotives = document.getElementById('motives');
let btnGenerateAppointment = document.getElementById('btnAccept');

btnGenerateAppointment.addEventListener('click', GenerarCita);

async function GenerarCita() {
    let dateAppointment = inputDateAppointment.value;
    let dateAppointmentRegistration = new Date(dateAppointment).toLocaleDateString();

    let userNameInput = inputUserName.value;
    let userEmail = inputUserEmail.value;
    let userTel = inputUserTel.value;

    let petName = inputPetName.value;
    let petRace = inputPetRace.value;

    let motives = inputMotives.value;

    let result = null;

    let resp = ValidarDatos(
        dateAppointment,
        userNameInput,
        userEmail,
        userTel,
        petName,
        petRace,
        motives,
    )
    if (resp === true) {
        result = await RegistrarCita(
            dateAppointmentRegistration,
            userNameInput,
            userEmail,
            userTel,
            petName,
            petRace,
            motives
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
                location.href = 'vetAppointments.html';
            });
        }
    }

}

function ValidarDatos(
    pdateAppointment,
    pUserNameInput,
    pUserEmail,
    pUserTel,
    pPetName,
    pPetRace,
    pMotives,
) {
    const pattern = new RegExp('^[A-Za-z]+$', 'i');

    if (new Date(pdateAppointment) < new Date() || pdateAppointment === null || pdateAppointment === undefined || pdateAppointment === '') {
        ImprimirMsjError('Estimado usuario, la fecha es un campo requerido y debe ser mayor a la fecha actual.');
        ResaltarInputInvalido('dateAppointment');
        return false;
    }

    if (!pattern.test(pUserNameInput) || pUserNameInput === null) {
        ImprimirMsjError('Estimado usuario, el nombre es un campo requerido y solo puede contener letras.');
        ResaltarInputInvalido('userName');
        return false;
    }

    if (pUserEmail === null) {
        ImprimirMsjError('Estimado usuario, el correo es un campo requerido.');
        ResaltarInputInvalido('userEmail');
        return false;
    }

    if (pUserTel === null || pUserTel.length < 8 || pUserTel.length > 8) {
        ImprimirMsjError('Estimado usuario, el teléfono es un campo requerido y debe ser un número telefónico válido.');
        ResaltarInputInvalido('userTel');
        return false;
    }

    if (!pattern.test(pPetName) || pPetName === null) {
        ImprimirMsjError('Estimado usuario, el nombre de la mascota es un campo requerido y solo puede contener letras.');
        ResaltarInputInvalido('petName');
        return false;
    }

    if (!pattern.test(pPetRace) || pPetRace === null) {
        ImprimirMsjError('Estimado usuario, la raza de la mascota es un campo requerido y solo puede contener letras.');
        ResaltarInputInvalido('petRace');
        return false;
    }

    if (pMotives === null) {
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