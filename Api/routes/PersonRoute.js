"use strict";

const express = require("express");
const router = express.Router();
const Persona = require("../models/PersonModel");

const registerMail = require("../templates/registerTemplate");
const resetMail =  require('../templates/resetPasstemplate');

router.post("/RegisterUssers", (req, res) => {
  let body = req.body;
  let nuevaPersona = new Persona({
    Identificacion: body.Identificacion,
    Nombre: body.Nombre,
    Direccion:body.Direccion,
    Email: body.Email,
    Telefono: body.Telefono,
    Password: body.Password,
    Rol: body.Rol,
    Estado: 1,
    Foto: 'fotoPerfil'
  });
  nuevaPersona.save((err, personaDB) => {
    if (err) {
      res.json({
        resultado: false,
        msj: "No se pudo registrar la persona, ocurrio el siguiente error: ",
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta",
        personaDB,
      });

      let nombreCompleto = personaDB.Nombre;
      let correo = personaDB.Email;
      registerMail.EnviarMail(nombreCompleto, correo);
    }
  });
});

router.get('/ListaVeterinarios', (req, res) => {
    Persona.find((err, ListaVeterinariosBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ListaVeterinariosBD
            });
        }
    });
  });

router.get("/AuthenticateUser", (req, res) => {
  let params = req.query;
  Persona.findOne(
    {
      Email: params.Email,
      Password: params.Password,
    },
    (err, personaDB) => {
      if (err) {
        res.json({
          resultado: false,
          msj: "No se pudieron obtener los datos del usuario: ",
          err,
        });
      } else {
        if (personaDB == null) {
          res.json({
            resultado: false,
            msj: "El email y/o contraseña ingresados son incorrectos.",
            personaDB,
          });
        } else if (Number(personaDB.Estado) == 0) {
          //inactivo
          res.json({
            resultado: false,
            msj: "El usuario se encuentra inactivo, por favor comuníquese con el administrador.",
            personaDB,
          });
        } else {
          res.json({
            resultado: true,
            msj: "Los datos se obtuvieron de manera correcta: ",
            personaDB,
          });
        }
      }
    }
  );
});

router.post("/ModifyPass", function (req, res) {
  let body = req.body;
  Persona.updateOne(
    { Email: body.Email },
    {
      $set: {
        Password: body.Password,
      },
    },
    function (err, info) {
      if (err) {
        res.json({
          resultado: false,
          msj: "Ocurrió un error inesperado y no se pudieron actualizar los datos: ",
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: "La contraseña fue actualizada de manera correcta.",
          info,
        });
      }
    }
  );
});
router.get("/BuscarPersonaEmail", (req, res) => {
  let params = req.query;
  Persona.findOne({ Email: params.Email }, (err, personaDB) => {
    if (err || !personaDB) {
      res.json({
        resultado: false,
        msj: "El usuario no se encuentra registrado. No se logró obtener los datos: ",
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        personaDB,
      });

      let nombreCompleto = personaDB.Nombre;
      let correo = personaDB.Email;
      resetMail.EnviarMail(nombreCompleto, correo);

    }
  });
});

router.get('/BuscarPersonaPorId', (req, res) => {
  let params = req.query;
  Persona.findOne({ _id: params._id }, (err, personaDB) => {
      if (err) {
          res.json({
              resultado: false,
              msj: 'No se pudo obtener datos: ',
              err
          });
      } else {
          res.json({
              resultado: true,
              msj: 'Los datos se obtuvieron de manera correcta: ',
              personaDB
          });
      }
  });
});

router.post('/ModifyUser', function (req, res) {
  let body = req.body;
  Persona.updateOne({ _id: body._id }, {
      $set: req.body
      
  }, function (err, info) {
      if (err) {
          res.json({
              resultado: false,
              msj: 'Sucedió un error inesperado y los datos no pudieron ser actualizados: ',
              err
          });
      } else {

          res.json({
              resultado: true,
              msj: 'Los datos del usuario han sido modificados de manera satisfactoria.',
              info
          });
      }
  }
  );
});

module.exports = router;
