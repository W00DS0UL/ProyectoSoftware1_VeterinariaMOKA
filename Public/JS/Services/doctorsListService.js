'use strict';

async function GetListarVeterinarios() {
    let result = {};

    await axios({
        method: 'get',
        url: apiUrl + '/ListaVeterinarios',
        responseType: 'json',
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}