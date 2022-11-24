'use strict';

const InputSearch = document.querySelector('.searchBarInput');
InputSearch.addEventListener('input', PrintScreen);

let ListarMascota = [];

GetMascotas();

async function GetMascotas() {
    let result = await GetListaMascotas();

    if (result != {} && result.resultado == true) {
        ListarMascota = result.ListaPetBD;
        PrintScreen();
    };
};

async function PrintScreen() {


    var tbody = document.querySelector('#tableInfo');
    tbody.innerHTML = '';

    let filter = InputSearch.value.toLowerCase();

    for (let i = 0; i < ListarMascota.length; i++) {
        if (ListarMascota[i].OwnerName.toLowerCase().includes(filter) ||
            ListarMascota[i].PetName.toLowerCase().includes(filter)
        ) {
            let fila = tbody.insertRow();

            let petName = fila.insertCell();
            let petRace = fila.insertCell();
            let ownerName = fila.insertCell();
            let cellActions = fila.insertCell();

            let btnModify = document.createElement('button');
            btnModify.type = 'button';
            btnModify.innerText = '🖋';
            btnModify.title = 'EDITAR';
            btnModify.classList.add('btnsTabla');

            btnModify.onclick = async function () {

                let newMotives = await getMotives();

                if (newMotives.length == 0) {
                    return;
                }

                let result = await actualizarMotivos(ListarMascota[i]._id, newMotives);

                if (result.resultado == true) {
                    await Swal.fire(
                        'Actualizado!',
                        'Se agregaron cambios a las notas de la mascota.',
                        'success'
                    );
                    location.href = '../HTML/petsList.html'
                }
            };

            let btnDetails = document.createElement('button');
            btnDetails.innerText = '📋';
            btnDetails.title = 'Details';
            btnDetails.classList.add('btnsTabla');

            btnDetails.onclick = async function () {

                let modal = document.querySelector('.modal');

                modal.classList.add('modalShow');
                modal.classList.remove('modalOut');

                var tbodyModal = document.querySelector('#modalTable');
                tbodyModal.innerHTML = '';

                let filaModal = tbodyModal.insertRow();

                let datosPropietario = filaModal.insertCell();
                let datosMascota = filaModal.insertCell();
                let datosServicios = filaModal.insertCell();

                datosPropietario.innerHTML =
                    `<b>Nombre del dueño:</b><br>${ListarMascota[i].OwnerName}<br><br><b>Dirección:</b><br>${ListarMascota[i].OwnerDirection}
                    <br><br><b>Teléfono:</b><br>${ListarMascota[i].OwnerPhone} <br><br><b>Cédula:</b><br>${ListarMascota[i].OwnerIdentification}`;

                datosMascota.innerHTML =
                    `<b>Nombre mascota:</b><br>${ListarMascota[i].PetName}<br><br><b>Raza:</b><br>${ListarMascota[i].PetType}
                    <br><br><b>Sexo:</b><br>${ListarMascota[i].PetSex}`;

                datosServicios.innerHTML = `${ListarMascota[i].PetObservations}`

                let btnOut = document.querySelector('#btnCerrar');
                btnOut.onclick = function () {
                    modal.classList.add('modalOut')
                    modal.classList.remove('modalShow');
                };

                let btnDelete = document.querySelector('#btnCancelarReserva');
                btnDelete.onclick = function () {
                    deleteFunction()
                    modal.classList.add('modalOut')
                    modal.classList.remove('modalShow');
                };
            };

            let btnDelete = document.createElement('button');

            btnDelete.type = 'button';
            btnDelete.innerText = '🗑️';
            btnDelete.title = 'ELIMINAR';
            btnDelete.classList.add('btnsTabla');

            btnDelete.addEventListener('click', deleteFunction);

            async function deleteFunction() {
                let confirm = false
                await Swal.fire({
                    title: `¿Eliminar la mascota llamada ${ListarMascota[i].PetName}?`,
                    text: "¡No podrás revertir esta acción!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar mascota'
                }).then((res) => {
                    confirm = res.isConfirmed;
                });
                if (confirm == true) {
                    let result = await EliminarMascotas(ListarMascota[i]._id);
                    if (result.resultado == true) {
                        Swal.fire(
                            'Borrada!',
                            'La mascota fue eliminada.',
                            'success'
                        );
                    };
                    await GetMascotas();
                };
            };

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnModify);
            divBtns.appendChild(btnDetails);
            divBtns.appendChild(btnDelete);

            ownerName.innerHTML = ListarMascota[i].OwnerName;
            petRace.innerHTML = ListarMascota[i].PetType;
            petName.innerHTML = ListarMascota[i].PetName;

            cellActions.appendChild(divBtns);
        };
    };
};


async function getMotives() {

    await Swal.fire({
        title: '<strong>Notas adicionales</strong>',
        icon: 'info',
        html: '<textarea id="textInfo" rows="10" cols="50" placeholder="Ingrese nuevas observaciones sobre su mascota aquí">',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar'
    });

    let textArea = document.querySelector('#textInfo');
    let newMotives = textArea.value;

    return newMotives;
};
