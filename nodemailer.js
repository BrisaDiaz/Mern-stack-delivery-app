const nodemailer = require("nodemailer");

   const transporter = nodemailer.createTransport({
  service:"Gmail",
    auth: {
      user: process.env.APLICATION_EMAIL, 
      pass: process.env.APLICATION_EMAIL_KEY, 

    },
  });

  transporter.verify().then( () =>{
    console.log('ready for send emails')

  }).catch( (err) => console.log(err))

  module.exports = nodemailer

  