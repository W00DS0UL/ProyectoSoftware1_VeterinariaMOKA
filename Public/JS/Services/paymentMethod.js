'use strict';

async function RegistrarTarjeta(
    OwnerName,
    CardNumber,
    CardExpiration,
    CardType,
    CardCVV
) {

    let result = {};

    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarTarjeta',
        responseType: 'json',
        data: {
            'OwnerName': OwnerName,
            'CardNumber': CardNumber,
            'CardExpiration': CardExpiration,
            'CardType': CardType,
            'CardCVV': CardCVV
        }
    }).then(async (res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se pudo registrar la tarjeta';
                    console.log('No se pudo registrar la tarjeta');
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
};
