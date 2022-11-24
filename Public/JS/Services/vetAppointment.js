'use strict';

async function RegistrarCita(
    Fecha,
    OwnerName,
    OwnerEmail,
    OwnerPhone,
    PetName,
    PetType,
    Motives
) {

    let result = {};

    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarCita',
        responseType: 'json',
        data: {
            'Fecha': Fecha,
            'OwnerName': OwnerName,
            'OwnerEmail': OwnerEmail,
            'OwnerPhone': OwnerPhone,
            'PetName': PetName,
            'PetType': PetType,
            'Motives': Motives
        }
    }).then(async (res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se pudo registrar la cita';
                    console.log('No se pudo registrar la cita');
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
