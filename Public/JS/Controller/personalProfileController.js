'use strict'

const btn = document.querySelector('#btnModify');
const txtName = document.querySelector('#txtName');
const txtAddress = document.querySelector('#txtAddress');
const txtStatus = document.querySelector('#txtStatus');
const inputRol = document.querySelector('#txtRol');
const password = document.querySelector('#txtpassword');
const number = document.querySelector('#numTel');
const numberID = document.querySelector('#numID');
const email=document.getElementById('txtEmail');


btn.addEventListener('click', ModificarUsuario);

function ModificarUsuario(){
    let inputName = txtName.value;
    let inputAddres = txtAddress.value;
    // let inputStatus = txtStatus.value;
    let inputPass = password.value;
    let inputNumber = number.value;
    let inputnumberID = numberID.value;
    let inputEmail=email.value;

    if (validator(inputName, inputAddres,  inputPass, inputNumber, inputnumberID,inputEmail)==false) {
       return;
    } 
};

function validator(inputName, inputAddres, inputPass, inputNumber, inputnumberID,inputEmail) {

    if (inputName == '' || inputName == null) {
        ImprimirMsjError("El nombre es requerido.");
        ResaltarInputInvalido("txtName");
        return false;
    }
    if (inputAddres == "" ||inputAddres==null || inputAddres==undefined ) {
        ImprimirMsjError("La dirección es requerida.");
        ResaltarInputInvalido("txtAddress");
        return false;
    }
    if (inputPass == '' || inputPass == null || inputPass==undefined) {
        ImprimirMsjError("La contraseña es requerida");
        ResaltarInputInvalido("txtpassword");
        return false;
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{5,12}/.test(inputPass))) {
        ImprimirMsjError("Contraseña no valida.");
        ResaltarInputInvalido("txtPassword");
        // Una mayuscula, una minuscula, un digito,minimo 5
        return false;
    }
    if (inputnumberID == '' || inputnumberID == null || inputnumberID==undefined) {
        ImprimirMsjError("El número de cédula es requerido.");
        ResaltarInputInvalido("numID");
        return false;
    }
    if (/^[0-9]{9,9}$/.test(inputnumberID) == false) {
        ImprimirMsjError("La cédula debe contener 9 dígitos.");
        ResaltarInputInvalido("numID");
        return false;
    }
    if (inputNumber == '' || inputNumber == null || inputNumber==undefined) {
        ImprimirMsjError("El número de teléfono es requerido.");
        ResaltarInputInvalido("numTel");
        return false;
    }
    if (/^[0-9]{8,8}$/.test(inputNumber) == false) {
        ImprimirMsjError("La número de teléfono debe contener 9 dígitos.");
        ResaltarInputInvalido("txtCedula");
        return false;
    }
    if(inputEmail == null || inputEmail=="" || inputEmail==undefined){
        ImprimirMsjError("El email es requerido.");
        ResaltarInputInvalido("txtEmail");
        return false;
    }
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputEmail))) {
        ImprimirMsjError("El formato del email no es permitido.");
        ResaltarInputInvalido("txtEmail");
        return false;
    }
    return true;
}
function ImprimirMsjRegistro(pmensaje) {
    Swal.fire({
      title: "Registrado!",
      text: pmensaje,
      icon: "success",
      confirmButtonText: "OK",
    });
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