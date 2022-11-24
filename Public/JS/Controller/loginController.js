'use strict'

const inputEmail = document.querySelector('#txtEmail');
const inputPassword = document.querySelector('#txtPassword');
const btnSubmit = document.querySelector('#btnLogIn');
const nombreIndex=document.getElementById('userNameIndex');





async function GetCredencial() {
    let valueEmail = inputEmail.value;
    let valuePassword = inputPassword.value;
    
    if (validator(valueEmail,valuePassword)==false){
        return;
    }
    let result = await AuthenticateUser(valueEmail, valuePassword);
    if (result == null || result.resultado == false || result.personaDB == null) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.msj
        });
    }
    else{
        
        location.href = 'subIndex.html';
    }
}

function validator(entryEmail, entryPassword) {
    if(entryEmail == null || entryEmail=="" || entryEmail==undefined){
        ImprimirMsjError("El email es requerido.");
        ResaltarInputInvalido("txtEmail");
        return false;
    }
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(entryEmail)) || entryEmail == '') {
        ImprimirMsjError("El formato del email no es permitido.");
        ResaltarInputInvalido("txtEmail");
        return false;
    }
    if(entryPassword == null || entryPassword=="" || entryPassword==undefined){
        ImprimirMsjError("La contraseña es requerida.");
        ResaltarInputInvalido("txtPassword");
        return false;
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{5,12}/.test(entryPassword)) || entryPassword == '') {
        ImprimirMsjError("Contraseña no valida.");
        ResaltarInputInvalido("txtPassword");
        // Una mayuscula, una minuscula, un digito,minimo 5
        return false;
    }
    return true;
}
function ImprimirMsjError(pmensaje) {
    Swal.fire({
    title: "Error!",
    text: pmensaje,
    icon: "error",
    confirmButtonText: "OK",
    });
}

function ResaltarInputInvalido(pInputId) {
let elementoLabel = document.getElementById(pInputId);
let styleOrigin = elementoLabel.style;

elementoLabel.style = "border: 1px solid red;";
setTimeout(function () {
elementoLabel.style = styleOrigin;
}, 5000);
}

btnSubmit.addEventListener('click', GetCredencial)
