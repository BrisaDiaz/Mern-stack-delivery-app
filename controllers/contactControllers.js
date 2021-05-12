const transporter = require('../nodemailer') ;


const sendToAdminEmail = async (req,res) =>{

  const {userEmail,userMessage,userName} = req.body
try{
let info = await transporter.sendMail({
    from: `"Contanct Form" <${process.env.DOMAIN}> `, 
    to: APLICATION_EMAIL, 
    subject: `User ${userName}  have send you a message`, 
    html: `
    <h2>Message:</h2>
    <p>${userMessage}</p>
    <address><b>email : ${userEmail}</b></address>`,
  });
  res.status(200).json({successful:true, message :"The message have been send successfully"})
}catch(err){

   res.status(500).json({successful:true, message: "something went wrong"})
}


}

module.exports = sendToAdminEmail