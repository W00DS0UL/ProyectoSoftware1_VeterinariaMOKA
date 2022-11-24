"use strict";
let botonRegistrarse = document.getElementById("btnSignUp");
let inputName = document.getElementById("txtName");
let inputAdress = document.getElementById("txtAddress");
let inputCedula = document.getElementById("numID");
let inputEmail = document.getElementById("txtEmail");
let inputTelefono = document.getElementById("numTel");
let inputPass = document.getElementById("txtpassword");
let inputRol = document.getElementById("txtRol");
let inputEstado = document.getElementById("txtestado");

botonRegistrarse.addEventListener("click", RegistrarUsuario);

let queryString, urlParams, _id;

async function RegistrarUsuario() {
  let sinputName = inputName.value;
  let sinputAdress = inputAdress.value;
  let ninputCedula = inputCedula.value;
  let sinputEmail = inputEmail.value;
  let ninputTelefono = inputTelefono.value;
  let sinputPass = inputPass.value;
  let sinputRol = inputRol.value;
  let sinputEstado = inputEstado.value;

  if (
    Validator(
      sinputName,
      sinputAdress,
      ninputCedula,
      sinputEmail,
      ninputTelefono,
      sinputPass,
      sinputRol,
      sinputEstado
    ) == false
  ) {
    return;
  }

  let result = null;

  result = await RegisterUssers(
    sinputName,
    sinputAdress,
    ninputCedula,
    sinputEmail,
    ninputTelefono,
    sinputPass,
    sinputRol,
    parseInt(sinputEstado)
  );

  if (result.err) {
    ImprimirMsjError(result.err);
  } else {
    Swal.fire({
      icon: "success",
      title: "¡Su registro se realizó con éxito!",
      text: "¡Ahora puedes acceder a nuestra plataforma Moka!",
    });
    cleanInputs();
    location.href = "usersList.html";
  }
}

function Validator(
  pinputName,
  pinputAdress,
  pinputCedula,
  pinputEmail,
  pinputTelefono,
  pinputPass,
  inputRol,
  inputEstado
) {
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{5,12}/;
  let regexCedula = /^[0-9]{9,9}$/;
  let regexTelefono = /^[0-9]{8,8}$/;

  if (
    pinputName == "" ||
    pinputName == null ||
    pinputName == undefined
  ) {
    ImprimirMsjError("El nombre es requerido para el registro.");
    ResaltarInputInvalido("txtName");
    return false;
  }
  if (
    pinputAdress == "" ||
    pinputAdress == null ||
    pinputAdress == undefined
  ) {
    ImprimirMsjError("La Dirección es requerida para el registro.");
    ResaltarInputInvalido("txtAddress");
    return false;
  }
  if (!inputRol) {
    ImprimirMsjError(
      "Debe asignarle un rol al usuario."
    );
    ResaltarInputInvalido("txtRol");
    return false;
  }
  if (!pinputPass) {
    ImprimirMsjError("La contraseña es requerida para el registro.");
    ResaltarInputInvalido("txtpassword");
    return false;
  }
  if (regexPass.test(pinputPass) == false) {
    ImprimirMsjError(
      "La contraseña debe contener mínimo 5 caracteres. Al menos 1 mayúscula, 1 minúscula y 1 número."
    );
    ResaltarInputInvalido("txtpassword");
    return false;
  }
  if (!pinputCedula) {
    ImprimirMsjError("La cédula es requerida para el registro.");
    ResaltarInputInvalido("numID");
    return false;
  }
  if (regexCedula.test(pinputCedula) == false) {
    ImprimirMsjError("La cédula debe contener 9 dígitos.");
    ResaltarInputInvalido("numID");
    return false;
  }
  if (!pinputTelefono) {
    ImprimirMsjError("El teléfono es requerido para el registro.");
    ResaltarInputInvalido("numTel");
    return false;
  }
  if (regexTelefono.test(pinputTelefono) == false) {
    ImprimirMsjError("El teléfono debe contener solamente 8 dígitos.");
    ResaltarInputInvalido("numTel");
    return false;
  }
  

  if (!pinputEmail) {
    ImprimirMsjError("El email es requerido para el registro.");
    ResaltarInputInvalido("txtEmail");
    return false;
  }
  if (regexEmail.test(pinputEmail) == false) {
    ImprimirMsjError("El email no cumple con el formato permitido.");
    ResaltarInputInvalido("txtEmail");
    return false;
  }
  if (!inputEstado) {
    ImprimirMsjError(
      "Debe asignarle un estado al usuario"
    );
    ResaltarInputInvalido("txtestado");
    return false;
  }
}

function cleanInputs() {
  inputName.value = "";
  inputCedula.value = "";
  inputEmail.value = "";
  inputTelefono.value = "";
  inputPass.value = "";
  inputConfirmPass.value = "";
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