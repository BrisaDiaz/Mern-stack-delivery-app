const sendEmail = require("../config/nodemailer");

const sendConfirmationEmail = async (url, email) => {
  try {
    const emailOptions = {
      from: `"Food Delivery App " <${process.env.OAUTH_USER}> `,
      to: email,
      subject: "Confirmación de cuenta de Email",
      html: `
    <div style= "max-width:600px; margin: 0 auto;">
      <h1 style="text-align: center;
    color: #5f6368;
        padding-bottom: 20px;
   ">Bienvenido/a!</h1>


    <p style="
        margin: 0;
        font-size: 16px;
        ">
                Estamos felices de darte la bienvenida. Solo falta un paso más para que puedas usar la aplicación. Solo presiona el botón de aquí debajo y tu cuenta sera verificada automáticamente.


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
    display: inline-block;">CONFIRMAR CUENTA</a></div>

           <p style="  margin-bottom:0;   font-size: 16px;">Si no funciona, por favor copia y pega el siguiente link en tu navegador: </p>

      <p style="text-align:center; margin:10px 0;  font-size: 16px;"><a href="#" target="_blank" style="color: #FFA73B;">${url}</a></p>

  <p style="  font-size: 16px;">Si tienes alguna pregunta, envíala a esta dirección de email, nosotros estaremos  felices de ayudarte.</p>
  <div>
      <p style="    font-size: 16px;
    padding: 30px 0;
    background: #ffd5a1;
        color: #5f6368;
    text-align: center;">Saludos,el equipo de Food Delivery App.</p>
`,
    };

    await sendEmail(emailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendConfirmationEmail;
