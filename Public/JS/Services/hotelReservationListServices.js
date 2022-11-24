'use strict';

async function GetListarReservacion() {
    let result = {};

    await axios({
        method: 'get',
        url: apiUrl + '/ListarReservacion',
        responseType: 'json'
    }).then(async (res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'Habitación ocupada.';
                    console.log(res.data.err);
                    break;
                default:
                    break;
            };
        };
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function EliminarReserva(p_id) {
    let result = {};
    await axios({
        method: 'delete',
        url: apiUrl + '/EliminarReserva',
        responseType: 'json',
        data: {
            '_id': p_id
        }

    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });


    return result;
};

async function actualizarDatos(p_id, arrayNewServices) {
    let result = {};
    await axios({
        method: 'put',
        url: apiUrl + '/ModificarReserva',
        responseType: 'json',
        data: {
            '_id': p_id,
            'Servicios': arrayNewServices,
        }
    }).then(async (res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se pudo realizar el cambio';
                    console.log('No se pudo registrar 11000');
                    console.log(res.data.err);
                    break;
                default:
                    break;
            }
        }
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}