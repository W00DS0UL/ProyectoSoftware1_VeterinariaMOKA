'use strict';

const InputSearch = document.querySelector('.searchBarInput');
InputSearch.addEventListener('input', PrintScreen);

let ListarCita = [];

GetCitas();

async function GetCitas() {
    let result = await GetListarCita();

    if (result != {} && result.resultado == true) {
        ListarCita = result.ListaCitaBD;
        PrintScreen();
    };
};

async function PrintScreen() {


    var tbody = document.querySelector('#tableInfo');
    tbody.innerHTML = '';

    let filter = InputSearch.value.toLowerCase();

    for (let i = 0; i < ListarCita.length; i++) {
        if (ListarCita[i].OwnerName.toLowerCase().includes(filter) ||
            ListarCita[i].PetName.toLowerCase().includes(filter) || filter === ''
        ) {
            let DoctorList =
                ['Dr. Francis', 'Dr. Gerald', 'Dr. Peter', 'Dra. Ana', 'Dr. Solano', 'Dr.Frederick', 'Dr.Auron'];
            let selector = Math.floor(Math.random() * DoctorList.length);
            let drAsignado = DoctorList[selector];

            let fila = tbody.insertRow();

            let ownerName = fila.insertCell();
            let petName = fila.insertCell();
            let doctorName = fila.insertCell();
            let dateAppointment = fila.insertCell();
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

                let result = await actualizarMotivos(ListarCita[i]._id, newMotives);

                if (result.resultado == true) {
                    await Swal.fire(
                        'Actualizado!',
                        'Se agregaron cambios a los motivos de la cita.',
                        'success'
                    );
                    location.href = '../HTML/vetAppointments.html'
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

                let datosGenerales = filaModal.insertCell();
                let datosPropietario = filaModal.insertCell();
                let datosMascota = filaModal.insertCell();
                let datosServicios = filaModal.insertCell();

                datosGenerales.innerHTML = `<b>Hora Cita:</b><br> ${ListarCita[i].Fecha}`;

                datosPropietario.innerHTML =
                    `<b>Nombre del dueño:</b><br>${ListarCita[i].OwnerName}<br><br><b>Email:</b><br>${ListarCita[i].OwnerEmail}
                    <br><br><b>Teléfono:</b><br>${ListarCita[i].OwnerPhone}`;

                datosMascota.innerHTML =
                    `<b>Nombre mascota:</b><br>${ListarCita[i].PetName}<br><br><b>Raza:</b><br>${ListarCita[i].PetType}`;

                datosServicios.innerHTML = `${ListarCita[i].Motives}`

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
                    title: `¿Eliminar la cita de ${ListarCita[i].OwnerName}?`,
                    text: "¡No podrás revertir esta acción!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar Cita'
                }).then((res) => {
                    confirm = res.isConfirmed;
                });
                if (confirm == true) {
                    let result = await EliminarCita(ListarCita[i]._id);
                    if (result.resultado == true) {
                        Swal.fire(
                            'Borrada!',
                            'La cita fue eliminada.',
                            'success'
                        );
                    };
                    await GetCitas();
                };
            };

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnModify);
            divBtns.appendChild(btnDetails);
            divBtns.appendChild(btnDelete);

            ownerName.innerHTML = ListarCita[i].OwnerName;
            petName.innerHTML = ListarCita[i].PetName;
            doctorName.innerHTML = drAsignado;
            dateAppointment.innerHTML = ListarCita[i].Fecha;

            cellActions.appendChild(divBtns);
        };
    };
};


async function getMotives() {

    await Swal.fire({
        title: '<strong>Modificar los motivos de la cita</strong>',
        icon: 'info',
        html: '<textarea id="textInfo" rows="10" cols="50" placeholder="Ingrese los nuevos motivos de su visita">',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar'
    });

    let textArea = document.querySelector('#textInfo');
    let newMotives = textArea.value;

    return newMotives;
};
