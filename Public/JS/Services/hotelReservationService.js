'use strict';

async function RegistrarReservacion(Room, DateEntrada, DateSalida, NombreMascota,
    Raza, Alimento, Sexo,
    NombrePropietario, EmailPropietario,
    Telefono, Servicios) {

    let result = {};

    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarReservacion',
        responseType: 'json',
        data: {
            'Room': Room,
            'DateEntrada': DateEntrada,
            'DateSalida': DateSalida,
            'NombreMascota': NombreMascota,
            'Raza': Raza,
            'Alimento': Alimento,
            'Sexo': Sexo,
            'NombrePropietario': NombrePropietario,
            'EmailPropietario': EmailPropietario,
            'Telefono': Telefono,
            'Servicios': Servicios,
        }
    }).then(async (res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se pudo registrar la reservación';
                    console.log('No se pudo registrar la reservación');
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
