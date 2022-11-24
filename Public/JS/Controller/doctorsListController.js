'use strict';

const InputSearch = document.querySelector('.searchBarInput');
InputSearch.addEventListener('input', PrintScreen);

let ListarVeterinarios = [];

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
        if (ListarVeterinarios[i].Rol === 3) {
            if (ListarVeterinarios[i].Nombre.toLowerCase().includes(filter)) {
    
                let fila = tbody.insertRow();
    
                let nombre = fila.insertCell();
                let correo = fila.insertCell();
                let tel = fila.insertCell();
    
                nombre.innerHTML = ListarVeterinarios[i].Nombre;
                correo.innerHTML = ListarVeterinarios[i].Email;
                tel.innerHTML = ListarVeterinarios[i].Telefono;;
    
            };
        }
    };
};
