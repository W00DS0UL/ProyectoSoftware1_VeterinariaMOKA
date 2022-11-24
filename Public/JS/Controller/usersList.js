'use strict';

const InputSearch = document.querySelector('.searchBarInput');
InputSearch.addEventListener('input', PrintScreen);

let ListarVeterinarios = [];
let userRol = '';

GetVeterinarios();

async function GetVeterinarios() {
    let result = await GetListarVeterinarios();

    if (result != {} && result.resultado == true) {
        ListarVeterinarios = result.ListaVeterinariosBD;
        PrintScreen();
        console.log(result.ListaVeterinariosBD);
    };
};

async function PrintScreen() {


    var tbody = document.querySelector('#modalTable ');
    tbody.innerHTML = '';

    let filter = InputSearch.value.toLowerCase();


    for (let i = 0; i < ListarVeterinarios.length; i++) {
        if (ListarVeterinarios[i].Nombre.toLowerCase().includes(filter) || filter === '') {

            let fila = tbody.insertRow();

            let nombre = fila.insertCell();
            let correo = fila.insertCell();
            let tel = fila.insertCell();
            let rol = fila.insertCell();
            let cellActions = fila.insertCell();


            let btnDetails = document.createElement('button');
            btnDetails.innerText = '📋';
            btnDetails.title = 'Details';
            btnDetails.classList.add('btnsTabla');

            btnDetails.onclick = function () {

                let modal = document.querySelector('.modal');

                modal.classList.add('modalShow');
                modal.classList.remove('modalOut');

                var tbodyModal = document.querySelector('.reservationInfo');
                tbodyModal.innerHTML = '';

                let filaModal = tbodyModal.insertRow();

                let datosGenerales = filaModal.insertCell();

                datosGenerales.innerHTML =
                    `<br><br><b>Nombre: </b>${ListarVeterinarios[i].Nombre} <br><br><b> Rol :</b>${ListarVeterinarios[i].Rol}<br><br>
                    <b>Identificación: </b> ${ListarVeterinarios[i].Identificacion}<br><br>
                    <b>Contraseña: </b>${ListarVeterinarios[i].Password}<br><br>
                    <b>Telefono : </b>${ListarVeterinarios[i].Telefono}<br><br>
                    <b>Estado : </b>${ListarVeterinarios[i].Estado}`;

                let btnOut = document.querySelector('#btnCerrar');
                btnOut.onclick = function () {
                    modal.classList.add('modalOut')
                    modal.classList.remove('modalShow');
                };
            };

            if (ListarVeterinarios[i].Rol == 1) {
                userRol = "Administrador";
            } else if (ListarVeterinarios[i].Rol == 2) {
                userRol = "Cliente";
            } else if (ListarVeterinarios[i].Rol == 3) {
                userRol = "Veterinario";
            } else {
                userRol = "Secretario";
            }

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnDetails);

            nombre.innerHTML = ListarVeterinarios[i].Nombre;
            correo.innerHTML = ListarVeterinarios[i].Email;
            tel.innerHTML = ListarVeterinarios[i].Telefono;
            rol.innerHTML = userRol;

            cellActions.appendChild(divBtns);
        };
    };
};
