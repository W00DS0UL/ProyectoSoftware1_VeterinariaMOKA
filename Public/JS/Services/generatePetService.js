'use strict';

async function RegistrarMascota(
    OwnerName,
    OwnerIdentification,
    OwnerPhone,
    OwnerDirection,
    PetName,
    PetType,
    PetSex,
    PetObservations
) {

    let result = {};

    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarMascota',
        responseType: 'json',
        data: {
            "OwnerName": OwnerName,
            "OwnerIdentification": OwnerIdentification,
            "OwnerPhone": OwnerPhone,
            "OwnerDirection": OwnerDirection,
            "PetName": PetName,
            "PetType": PetType,
            "PetSex": PetSex,
            "PetObservations": PetObservations
        }
    }).then(async (res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se pudo registrar la mascota';
                    console.log('No se pudo registrar la mascota');
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
