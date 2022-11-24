'use strict';
async function ModifyPass(pEmail, pPass) {
  let result = {};
  await axios({
    method: "post",
    url: apiUrl + "/ModifyPass",
    responseType: "json",
    data: {
      Email: pEmail,
      Password: pPass,
    },
  })
    .then(async (res) => {
      if (res.data.resultado == false) {
        switch (res.data.err.code) {
          case 11000:
            res.data.msj =
              "No se pudo registrar la persona, ya existe una persona registrada con esa identificacion o correo";
            console.log("No se pudo registrar 11000");
            console.log(res.data.err.code);
            break;
          default:
            break;
        }
      }
    })
    .catch((err) => {
      result.err = err.message || "Ocurrio un error, intente de nuevo";
      console.log(err);
    });
  return result;
}

async function BuscarPersonaEmail(pEmail){
  let result = {};
  await axios({
      method: 'get',
      url: apiUrl + '/BuscarPersonaEmail',
      responseType: 'json',
      params: { 
          'Email': pEmail 
      },
  }).then((res) => {
      result = res.data;
  }).catch((err) => {
      console.log(err);
  });
  return result;
}
