

const checkIsValidUser = (req,res,next) =>{
const {lastName,email,name,password} = req.body

if( !email ||!lastName || !name || !password)res.status(400).json({successful:false, message:`Missing inputs, name: ${name} lastName: ${lastName} email:${email} password:${password}`})

req.userName =`${name} ${lastName}`
if(password.trim().length < 5 ) return res.status(400).json({successful:false, message:`Password min length is 5`})


next()
}
const checkIsValidUpdate= (req,res,next) =>{
const {lastName,name,newPassword,street,city,streetNumber,number} = req.body


if(newPassword){
  
  if(password.trim().length < 5 ) return res.status(400).json({successful:false, message:`Password min length is 5`})
}
if(number){
   if(parseInt(number).length < 5 ) return res.status(400).json({successful:false, message:`Password min length is 10`})
}

if(!lastName || !name) return res.status(400).json({successful:false, message:`Full name is required`})
req.userName =`${name} ${lastName}`

if(!street|| !city|| !streetNumber) return res.status(400).json({successful:false, message:`Full address is required`})

req.userAdress = `${street} ${streetNumber}, ${city}`
next()
}
module.exports ={checkIsValidUser,checkIsValidUpdate}