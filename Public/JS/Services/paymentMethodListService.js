'use strict';

async function GetListarTarjetas() {
    let result = {};

    await axios({
        method: 'get',
        url: apiUrl + '/ListarTarjetas',
        responseType: 'json'
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
};

async function EliminarTarjeta(p_id) {
    let result = {};
    
    await axios({
        method: 'post',
        url: apiUrl + '/EliminarTarjeta',
        responseType: 'json',
        data:{
            '_id':p_id
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
};

