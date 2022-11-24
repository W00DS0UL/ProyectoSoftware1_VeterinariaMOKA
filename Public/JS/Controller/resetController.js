'use strict';

let buttonEmail= document.getElementById('btnSendEmail');
let buttonLogIn = document.getElementById('btnConfirmPasswordChange');
buttonLogIn.addEventListener('click', ChangePassword);
buttonEmail.addEventListener('click', SendEmail);


let email = document.getElementById('txtEmail');
let email2 = document.getElementById('txtEmail2');
let password1 = document.getElementById('txtpass1');
let password2 = document.getElementById('txtpass2');

let mainEmail="";

let queryString, urlParams, Email;
queryString = window.location.search;

urlParams = new URLSearchParams(queryString);

async function SendEmail(){
  let inputEmail = email.value;
  mainEmail=inputEmail;


  if(Validate2(inputEmail)==false){
    return;
  }
  let persona=null;
  persona = await BuscarPersonaEmail(inputEmail);
  if (persona == null || persona.resultado == false) {
    ImprimirMsjError("El usuario no se encuentra registrado en la plataforma!");
  }else{
    Swal.fire({
      icon: "success",
      title: "¡Se ha enviado un email para realizar proceso de restablecer contraseña!",
      text: "¡Ya podés realizar el tramite de cambio de contraseña!",
    });
  } 
  return mainEmail;
};


async function ChangePassword() {
  let inputEmail2=email2.value;
  let inputPass = password1.value;
  let inputPass2 = password2.value;


  if (Validate(inputPass, inputPass2) == false) {
    return;
  }

 
  let result = null;
  result = await ModifyPass(inputEmail2, inputPass);
  if (result.err) {
    ImprimirMsjError(result.err);
  } else {
    Swal.fire({
      icon: "success",
      title: "¡Su cambio de contraseña se realizó con éxito!",
      text: "¡Ahora puedes acceder a nuestra plataforma Moka!",
    }).then(res => {
      location.href = 'logIn.html';
  });
  }
}

function Validate(inputPass, inputPass2) {

  // Validating passwords

  if (inputPass == "") {
    ImprimirMsjError("Por favor ingrese su contraseña");
    ResaltarInputInvalido("txtpass1");
    return false;
  }

  if (inputPass != inputPass2) {
    ImprimirMsjError("Las contraseñas ingresadas no coinciden");
    ResaltarInputInvalido("txtpass1");
    ResaltarInputInvalido("txtpass2");
    return false;
  }
  return true;
}

function Validate2(pEmail){
  if(!pEmail){
    ImprimirMsjError("Por favor ingrese su correo");
    ResaltarInputInvalido("txtEmail");
    return false;
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(pEmail)) {
    ImprimirMsjError("Por favor ingrese una dirección de correo válida");
    ResaltarInputInvalido("txtEmail");
    return false;
  }
  return true;
};

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
