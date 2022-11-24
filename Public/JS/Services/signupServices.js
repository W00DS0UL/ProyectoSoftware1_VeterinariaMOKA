'use strict'

// var dbUssers = [admin, vet, secretary];

async function RegisterUssers(inputName, inputCed, inputEmail, inputTel, inputPass,inputAdress) {

    let result = {};

    await axios({
        method: 'post',
        url: apiUrl + '/RegisterUssers',
        responseType: 'json',
        data: {
            'Nombre': inputName,
            'Identificacion': inputCed,
            'Email': inputEmail,
            'Telefono': inputTel,
            'Password': inputPass,
            'Rol': 2,
            'Estado':1,
            'Direccion':inputAdress,
            'Foto': 'fotoPerfil'
        }
    }).then(async(res) => {
        if(res.data.resultado == false){
            switch (res.data.err.code) {
                case 11000:
                        result.err = 'No se pudo registrar la persona, ya existe una persona registrada con esa identificacion o correo';
                    break;            
                default:
                        result.err = "Ocurrio un error, intente de nuevo"
                    break;
            }
        }
    }).catch((err) => {
        result.err = err.message || "Ocurrio un error, intente de nuevo"
        console.log(err);
    });

    return result;

};

async function AuthenticateUser(entryEmail, entryPassword) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/AuthenticateUser',
        responseType: 'json',
        params: {
            'Email': entryEmail,
            'Password': entryPassword
        }
    }).then((res) => {
        result = res.data;
        if (result != null && result.resultado == true && result.personaDB != null) {
            SetSesionActiva(result.personaDB);
        }
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

function SetSesionActiva(pDatosPerfil){
    localStorage.setItem('datosSesionActiva', JSON.stringify(pDatosPerfil));
    console.log(pDatosPerfil);
}
