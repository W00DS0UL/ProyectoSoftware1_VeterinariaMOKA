'use strict';

async function GetListaMascotas() {
    let result = {};

    await axios({
        method: 'get',
        url: apiUrl + '/ListaMascotas',
        responseType: 'json'
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function actualizarMotivos(p_id, newMotives) {
    let result = {};
    await axios({
        method: 'put',
        url: apiUrl + '/ModificarMascota',
        responseType: 'json',
        data: {
            '_id': p_id,
            'PetObservations': newMotives,
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

async function EliminarMascotas(p_id) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/EliminarMascota',
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