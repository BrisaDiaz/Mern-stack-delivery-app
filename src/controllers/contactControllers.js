const sendEmail = require("../config/nodemailer");

const sendToAdminEmail = async (req, res) => {
  try {
    const { userEmail, userMessage, userName, subject } = req.body;

    if (!userName || !userEmail || !userMessage || !subject)
      return res.status(400).json({
        successful: false,
        message: " Bad request name, email ,subject and message are required",
      });

    const emailOptions = {
      from: `"Food Delivery App " <${process.env.OAUTH_USER}> `,
      to: process.env.OAUTH_USER,
      subject: subject,
      html: `
      <h1 style="text-align: center;
    color: #fc9707;
        padding-bottom: 20px;
   ">${subject}</h1>

    <h2 style="color: #272727;
        margin: 5px 0;
    ">Remitente:</h2>
    <div>

    <p style="text-transform: capitalize;
        margin: 0;
        font-size: 16px;
        "><b style="color: #fcba1c;">Nombre: </b>${userName}</p>

    <p style="margin: 0;
            font-size: 16px;
    "><b style="color: #fcba1c;">Email: </b>${userEmail}</p>

    </div>
       <h2 style="color: #272727;
           margin: 5px 0;
           ">Mensaje:</h2>

    <div  style="padding: 5px 15px; background: #00000005">

    <p style="font-size: 16px;">${userMessage}</p>

    </div>

`,
    };

    await sendEmail(emailOptions);

    return res.status(200).json({
      successful: true,
      message: "The message have been send successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ successful: false, message: "something went wrong" });
  }
};

module.exports = { sendToAdminEmail };
