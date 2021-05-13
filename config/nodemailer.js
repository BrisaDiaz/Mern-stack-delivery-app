const nodemailer = require('nodemailer');
 require('dotenv').config({path: '.env'});
const { google } = require("googleapis");






async function createTransporter(){

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDERICT_URI
  )

oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN })

  try{

const accessToken = await new Promise((resolve, reject) => {

  oauth2Client.getAccessToken((err, token) => {
    if (err) {
      reject("Failed to create access token :(");
    }
    resolve(token);
  });
});


   const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type:'OAuth2’',
      user: process.env.OAUTH_USER, 
      accessToken,
      clientId: process.env.OAUTH_CLIENT_ID, 
      clientSecret:  process.env.OAUTH_CLIENT_SECRET,
      refreshToken :  process.env.OAUTH_REFRESH_TOKEN,
 expires: 1484314697598

    },
  });

  

return transporter

  }catch(err){

      console.log(err)

  }


}

const sendEmail = async (emailOptions) => {
try{
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);

}catch(err){
  console.log(err)

}

};

//   sendEmail()
//   .then(result => res.status(200).json({success:true, message:"The message have been send successfully"}))
// .catch(err => console.log(err.message))
const emailOptions = {

    from: `"Food Delivery App " <${process.env.OAUTH_USER}> `, 
    to: 'tiffany191817@gmail.com' , 
    subject: `app  have send you a message`, 
    html: `
    <h2>Message:</h2>
    <p>hola desde backend</p>`
 ,
  }
  sendEmail(emailOptions)
 

  module.exports = sendEmail