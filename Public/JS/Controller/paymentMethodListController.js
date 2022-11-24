'use strict';

let ListarTarjetas = [];

GetTarjetas();

async function GetTarjetas() {
    let result = await GetListarTarjetas();

    if (result != {} && result.resultado == true) {
        ListarTarjetas = result.ListaMetodosPagoBD;
        PrintScreen();
    };
};

async function PrintScreen() {
    var tbody = document.querySelector('#tableInfo');
    tbody.innerHTML = '';

    for (let i = 0; i < ListarTarjetas.length; i++) {
        
            let num4 = ListarTarjetas[i].CardNumber.split('')[ListarTarjetas[i].CardNumber.length - 1];
            let num3 = ListarTarjetas[i].CardNumber.split('')[ListarTarjetas[i].CardNumber.length - 2];
            let num2 = ListarTarjetas[i].CardNumber.split('')[ListarTarjetas[i].CardNumber.length - 3];
            let num1 = ListarTarjetas[i].CardNumber.split('')[ListarTarjetas[i].CardNumber.length - 4];
            let fila = tbody.insertRow();

            let CardType = fila.insertCell();
            let CardNumber = fila.insertCell();
            let CardOwner = fila.insertCell();
            let CardExpiration = fila.insertCell();
            let cellActions = fila.insertCell();

            let btnDelete = document.createElement('button');

            btnDelete.type = 'button';
            btnDelete.onclick = async function(){
                    let confirm = false
                    await Swal.fire({
                        title: `¿Eliminar la tarjeta de número ${ListarTarjetas[i].CardNumber}?`,
                        text: "¡No podrás revertir esta acción!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Eliminar tarjeta'
                    }).then((res) => {
                        confirm = res.isConfirmed;
                    });
                    if (confirm == true) {
                        let result = await EliminarTarjeta(ListarTarjetas[i]._id);
                        if (result.resultado == true) {
                            Swal.fire(
                                'Borrado!',
                                'La reserva fue eliminada.',
                                'success'
                            );
                        };
                        await GetTarjetas()
                    };
            };
            btnDelete.innerText = '🗑️';
            btnDelete.title = 'ELIMINAR';
            btnDelete.classList.add('btnsTabla');

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnDelete);

            CardNumber.innerHTML = "**** **** **** "+num1+num2+num3+num4;
            CardType.innerHTML = ListarTarjetas[i].CardType;
            CardOwner.innerHTML = ListarTarjetas[i].OwnerName;
            CardExpiration.innerHTML = ListarTarjetas[i].CardExpiration;

            cellActions.appendChild(divBtns);
    }
}

function ImprimirMsjError(pmensaje){
    Swal.fire({
        title:'Error!',
        text: pmensaje,
        icon: 'error',
        confirmButtonText:'OK'
    });
}

function ImprimirMsjSuccess(pmensaje){
    Swal.fire({
        title:'Tarjeta eliminada',
        text: pmensaje,
        icon: 'success',
        confirmButtonText:'OK'
    });
}
