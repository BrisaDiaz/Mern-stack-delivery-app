const sendEmail = require('../config/nodemailer') ;


const sendToAdminEmail = async (req,res) =>{

  const {userEmail,userMessage,userName} = req.body

  const emailOptions = {
     from: `"Food Delivery App " <${process.env.OAUTH_USER}> `, 
    to: 'tiffany191817@gmail.com' , 
    subject: `User ${userName}  have send you a message`, 
    html: `
    <h2>Message:</h2>
    <p>${userMessage}</p>
    <address><b>email : ${userEmail}</b></address>`,
  }
  
try{

  await  sendEmail(emailOptions);
  
  res.status(200).json({successful:true, message :"The message have been send successfully"})


}catch(err){

   res.status(500).json({successful:false, message: "something went wrong"})
}


}

module.exports = sendToAdminEmail