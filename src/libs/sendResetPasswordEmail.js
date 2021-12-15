const sendEmail = require("../config/nodemailer");

const sendResetPasswordEmail = async (url, email) => {
  try {
    const emailOptions = {
      from: `"Food Delivery App " <${process.env.OAUTH_USER}> `,
      to: email,
      subject: "Establecer nueva contraseña",
      html: `
    <div style= "max-width:600px; margin: 0 auto;">
      <h1 style="text-align: center;
    color: #5f6368;
        padding-bottom: 20px;
   ">Restablecer nueva contraseña</h1>


    <p style="
        margin: 0;
        font-size: 16px;
        ">
              Solo falta unos pasos más para que puedas establecer tu nueva contraseña. Solo presiona el botón de aquí debajo y seras redirigido a un formulario para ingresar tu nueva contraseña.

        </p>
     <div  style="width: fit-content;
margin: 40px auto;
    " ><a href="${url}" target="_blank" style=" font-size: 16px;
    font-family: Helvetica,Arial,sans-serif;
    color: #222;
    cursor:pointer;
    text-decoration: none;
    padding: 10px 20px;
  border: 2px solid #202124;
    background: #fcba1c;
    font-weight: 600;
    display: inline-block;">Canbiar contraseña</a></div>

      <p style="  margin-bottom:0;   font-size: 16px;">Si no funciona, por favor copia y pega el siguiente link en tu navegador: </p>

      <p style="text-align:center; margin:10px 0;  font-size: 16px;"><a href="#" target="_blank" style="color: #FFA73B;">${url}</a></p>

  <div>

`,
    };

    await sendEmail(emailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendResetPasswordEmail;
