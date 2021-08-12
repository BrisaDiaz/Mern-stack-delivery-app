const User =require('../models/user.model');

 const subscribeUser = async (req,res) =>{

  const {userEmail} = req.body.email

  const userFound = await User.findOne({email: userEmail})

  if (!userFound)  return res.status(404).json({message:"No user faund"} )
try{
   await userFound.subscribe().save()
}catch(err){

  console.log(err)
  res.status(500).json({success:false,message:"subscribtion fail"})

}


 }


 module.exports = { subscribeUser}