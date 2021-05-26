const User =require('../models/user.model');

 const subscribeUser = async (req,res) =>{

  const {userEmail} = req.body.email
   
  const userFound = await User.findOne({email: userEmail})

  if (!userFound)  return res.status(404).json({message:"No user faund"} )

    await  User.findByIdAndUpdate(userFound._id, {$set:{
                subscribe: true ,
            }}, { new: true })

      
 }


 module.exports = { subscribeUser}