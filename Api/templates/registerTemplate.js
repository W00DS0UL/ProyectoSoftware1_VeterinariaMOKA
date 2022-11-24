"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

this.EnviarMail = (pNombreCompleto, pCorreo) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPSSWD,
    },
  });

  let mailOptions = {
    from: process.env.MAILUSER,
    to: pCorreo,
    subject: "Bienvenido(a) a la plataforma de Veterinaria Moka",
    html: `
        <table style="border: px solid #EA803F; border-radius: 17px; font-family: Verdana, Helvetica, sans-serif;width:600px; background-color:#082F32" cellpadding="0" cellspacing="0"   >
          <tr height="300px">
              <td>
                  <h1 style="color:#fff; text-align:center">
                      ¡Bienvenido(a) a Veterinaria Moka!
                  </h1>
                  <p style="color:#fff; text-align:center">
                      Estimado(a) 
                      <span style="color:#e36212;">
                          ${pNombreCompleto}:
                      </span> 
                      <br> Ya puede iniciar sesión con sus credenciales en la plataforma.
                  </p>
                
              </td>
          </tr>
          <tr style="background-color: #EA803F; border-bottom-left-radius: 17px;">
              <td style="text-align:center;border-radius: 0px 0px 17px 17px;">
                  <p style="color: #000;">Copyright 2022 | MOKA / SmartFhisk | Todos los derechos reservados!</p>
              </td>
          </tr>
        </table>
        `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("El correo se envió de manera correcta" + info.response);
    }
  });
};

module.exports = this;
