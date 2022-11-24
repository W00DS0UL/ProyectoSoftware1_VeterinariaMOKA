'use strict';

const statusInput = document.querySelector('.inputFilter');
statusInput.addEventListener('input', PrintScreen);

let ListarReservacion = [];

GetReservacion();

async function GetReservacion() {
    let result = await GetListarReservacion();

    if (result != {} && result.resultado == true) {
        ListarReservacion = result.ListaReservacionBD;
        PrintScreen();
    };
};

async function PrintScreen() {
    var tbody = document.querySelector('#tableInfo');
    tbody.innerHTML = '';

    let filter = statusInput.value.toLowerCase();

    for (let i = 0; i < ListarReservacion.length; i++) {
        if (ListarReservacion[i].NombrePropietario.toLowerCase().includes(filter) ||
            ListarReservacion[i].NombreMascota.toLowerCase().includes(filter) ||
            ListarReservacion[i].Room.toLowerCase().includes(filter) || filter === ''
        ) {
            let fila = tbody.insertRow();

            let cellRoom = fila.insertCell();
            let cellNombrePropietario = fila.insertCell();
            let cellMascota = fila.insertCell();
            let cellEntrada = fila.insertCell();
            let cellSalida = fila.insertCell();
            let cellActions = fila.insertCell();

            let btnModify = document.createElement('button');
            btnModify.type = 'button';
            btnModify.innerText = '🖋';
            btnModify.title = 'EDITAR';
            btnModify.classList.add('btnsTabla');

            btnModify.onclick = async function () {
                let arrayNewServices = await msg();

                if (arrayNewServices.length == 0) {
                    return;
                }

                let result = await actualizarDatos(ListarReservacion[i]._id, arrayNewServices);

                if (result.resultado == true) {
                    await Swal.fire(
                        'Actualizado!',
                        'Se agregaron cambios a los servicios adicionales.',
                        'success'
                    );
                    location.href = '../HTML/hotelReservations.html'
                }
            };

            let btnReservationDetails = document.createElement('button');
            btnReservationDetails.innerText = '📋';
            btnReservationDetails.title = 'Details';
            btnReservationDetails.classList.add('btnsTabla');

            btnReservationDetails.onclick = function () {

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

                datosGenerales.innerHTML =
                    `<b>Entrada:</b><br> ${ListarReservacion[i].DateEntrada}<br><br> <b>Salida:</b><br> ${ListarReservacion[i].DateSalida}`;

                datosPropietario.innerHTML =
                    `<b>Nombre del dueño:</b><br>${ListarReservacion[i].NombrePropietario}<br><br><b>Email:</b><br>${ListarReservacion[i].EmailPropietario}
                    <br><br><b>Teléfono:</b><br>${ListarReservacion[i].Telefono}`;

                datosMascota.innerHTML =
                    `<b>Nombre mascota:</b><br>${ListarReservacion[i].NombreMascota}<br><br><b>Raza:</b><br>${ListarReservacion[i].Raza}
                    <br><br><b>Alimento:</b><br>${ListarReservacion[i].Alimento}`;

                datosServicios.innerHTML = `${ListarReservacion[i].Servicios}`.replaceAll(',', '<br><br>')

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

            btnDelete.addEventListener('click', deleteFunction)

            async function deleteFunction() {
                let confirm = false
                await Swal.fire({
                    title: `¿Eliminar la reservación de ${ListarReservacion[i].NombrePropietario}?`,
                    text: "¡No podrás revertir esta acción!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar reservación'
                }).then((res) => {
                    confirm = res.isConfirmed;
                });
                if (confirm == true) {
                    let result = await EliminarReserva(ListarReservacion[i]._id);
                    if (result.resultado == true) {
                        Swal.fire(
                            'Borrado!',
                            'La reserva fue eliminada.',
                            'success'
                        );
                    };
                    await GetReservacion()
                };
            };

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnModify);
            divBtns.appendChild(btnReservationDetails);
            divBtns.appendChild(btnDelete);

            cellRoom.innerHTML = ListarReservacion[i].Room;
            cellNombrePropietario.innerHTML = ListarReservacion[i].NombrePropietario;
            cellMascota.innerHTML = ListarReservacion[i].NombreMascota;
            cellEntrada.innerHTML = ListarReservacion[i].DateEntrada;
            cellSalida.innerHTML = ListarReservacion[i].DateSalida;

            cellActions.appendChild(divBtns);
        };
    };
};

async function msg() {
    let newServices = [];

    await Swal.fire({
        title: '<strong>Modificar servicios adicionales</strong>',
        icon: 'info',
        html:
            '<label for="chkBaño">' +
            ' <input type="checkbox" id="chkBaño" value="Baño">' +
            'Baño' +
            '</label>' +
            '<br><br>' +
            '<label for="chkPeluqueria">' +
            ' <input type="checkbox" id="chkPeluqueria" value="Dientes">' +
            'Peluquería' +
            '</label>' +
            '<br><br>' +
            '<label for="chkDientes">' +
            ' <input type="checkbox" id="chkDientes" value="Dientes">' +
            'Cepillado de dientes' +
            '</label>' +
            '<br><br>' +
            '<label for="chkOidos">' +
            ' <input type="checkbox" id="chkOidos" value="Oidos">' +
            'Limpieza de oídos' +
            '</label>' +
            '<br><br>' +
            '<label for="chkUñas">' +
            ' <input type="checkbox" id="chkUñas" value="Uñas">' +
            'Corte de uñas' +
            '</label>' +
            '<br><br>' +
            '<label for="chkPaseo">' +
            ' <input type="checkbox" id="chkPaseo" value="Paseo">' +
            'Paseo' +
            '</label>',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar'
    });

    let aditionalServices = document.querySelectorAll('input[type = "checkbox"]');
    for (let i = 0; i < aditionalServices.length; i++) {
        if (aditionalServices[i].checked === true) {
            let valor = aditionalServices[i].value
            newServices.push(valor);
        };
    };
    return newServices;
};
