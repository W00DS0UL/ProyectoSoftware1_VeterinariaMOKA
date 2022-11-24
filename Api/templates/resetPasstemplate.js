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
    subject: "Solicitud de restablecer contraseña en la plataforma",
    html: `
        <table style="border: px solid #EA803F; border-radius: 17px; font-family: Verdana, Helvetica, sans-serif;width:600px; background-color:#082F32" cellpadding="0" cellspacing="0"   >
            <tr height="200px">
                <td>
                    
                    <p style="color:#fff; text-align:center; padding-left: 10px;">
                        Hola, 
                        <span style="color:#e36212;">
                            ${pNombreCompleto}:
                        </span> 
                    </p>
                    <h1 style="color:#fff; text-align:center">
                        ¿Has solicitado restablecer tu contraseña?
                    </h1>
                
                </td>
            </tr>
            <tr>
                <td style="text-align: center;background-color: #d2d2d2; ">
                    <p > Para restablecer tu contraseña solo debes dar click <a style="color: #e36212;" href="http://127.0.0.1:5500/Public/HTML/resetPassword.html">aquí</a></p>
                </td>
            </tr>
            <tr style="background-color: #EA803F; border-bottom-left-radius: 17px;">
                <td style="text-align:center; border-radius: 0px 0px 17px 17px;">
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