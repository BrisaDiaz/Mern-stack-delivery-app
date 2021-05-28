

const checkIsValidUser = (req,res,next) =>{
const {lastName,email,name,password} = req.body

if( !email ||!lastName || !name || !password)res.status(400).json({successful:false, message:`Missing inputs, name: ${name} lastName: ${lastName} email:${email} password:${password}`})

let reg = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/

let isValidEmail = reg.test(email)

if(!isValidEmail) return res.status(400).json({successful:false, message:`Email is not valid`})


if(!lastName || !name) return res.status(400).json({successful:false, message:`Full name is required`})


if(typeof lastName !== String || typeof name  !== String ) return res.status(400).json({successful:false, message:` Name is not valid`})


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
   if(parseInt(number).length < 5 ) return res.status(400).json({successful:false, message:`Number min length is 10`})
}

if(!lastName || !name) return res.status(400).json({successful:false, message:`Full name is required`})
req.userName =`${name} ${lastName}`

if(typeof astName  !== String || typeof name   !== String) return res.status(400).json({successful:false, message:` Name is not valid`})


if(!street|| !city|| !streetNumber) return res.status(400).json({successful:false, message:`Full address is required`})

if( typeof(streetNumber) !== Number || streetNumber.length > 4  ) return res.status(400).json({successful:false, message:`Street address not valid`})

req.userAdress = `${street} ${streetNumber}, ${city}`
next()
}
module.exports ={checkIsValidUser,checkIsValidUpdate}