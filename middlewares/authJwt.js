const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const {Role} = require('../models/role.model')
const verifyToken = async (req,res,next) =>{

try{ 
   const token = req.headers["x-access-token"];
   
  if(!token) return res.status(403).json({message:"No token provided"})

  
 const decoded = jwt.verify(token, process.env.SECRET)

req.userId = decoded.id

 const user = await User.findById(req.userId,{password:0})

 if(!user) return res.status(404).json({message:"No user faund"} )

  next()
}catch(err){
res.status(401).json({message: "Unauthorized"})
}
  
}

const isAdmin = async (req,res,next) =>{

  try{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})

     for (let i = 0; i < roles.length; i++) {

      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: error });
  }
 
}
const isModerator = async (req,res,next) =>{
try{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})

      for (let i = 0; i < roles.length; i++) {

      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
      return res.status(403).json({ message: "Require Moderator Role!" });

}catch (error) {
    console.log(error)
    return res.status(500).json({ message: error });
    
  }

}

module.exports = {verifyToken,isAdmin,isModerator}