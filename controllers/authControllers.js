
const mongoose = require('mongoose')
const User =require('../models/user.model');
const TemporalUser =require('../models/temporalUser.model');
const {Role} =require('../models/role.model');
 require('dotenv').config({path: '.env'})
const jwt =require('jsonwebtoken');

const sendConfirmationEmailFunction = require('../libs/sendConfirmationEmail') ;

 const signUp = async (req, res) => {
  try {
   const { email, password, roles } = req.body;

   const id =mongoose.Types.ObjectId()

  const newTemporalUser = new TemporalUser({
      _id: id,
      name:req.userName,
      email,
      password,
     
    });

    if (req.body.roles) {

      const foundRoles = await Role.find({ name: { $in: roles } });
      newTemporalUser.roles = foundRoles.map((role) => role._id);

    } else {

      const role = await Role.findOne({ name: "user" });
      newTemporalUser.roles = [role._id];

    }

   const token = jwt.sign({ 
    id, 
  
  }, process.env.JWT_EMAIL_CONFIRMATION_KEY);

  newTemporalUser.emailToken = token

    await newTemporalUser.save();



    return res.status(201).json({successful: true ,message:"User creacted successfully",redirect:'/authentication/confirmation' ,id: id })

  } catch (error) {
    console.log(error);

    return res.status(500).json({successful: false ,message:"Something went wrong"});
  }
};

const sendConfirmationEmail = async(req,res) => {
  try{

   const userFound = await TemporalUser.findById(req.body.id)


  const token = userFound.emailToken



  const url = `${process.env.HOST || 'localhost:7000'}/api/auth/verification/${token}`

   await sendConfirmationEmailFunction(url,userFound.email)

res.status(200).json({success: true , message: " Account confirmation email has been send successfully"})


  }catch(error){
    console.log(error);

   return  res.status(500).json({message:"something went wrong"})
  }

 
}

const validateEmailToken  = async (req,res) => {

  try{ 

   const token = req.params.token

  if(!token) return res.status(403).json({success:false ,message:"No token provided"})

 const decoded =   jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_KEY)

const id  =  decoded.id


 const user = await TemporalUser.findById(id)



 if(!user) return res.status(404).json({message:"No user faund"} )

const newUser = new User({
      name: user.name,
      email: user.email,
      password: await User.encryptPassword(user.password),
      roles:user.roles,
    });

    await newUser.save();
    await TemporalUser.findByIdAndRemove(user._id);
    



 res.redirect(`${process.env.HOST || 'localhost:3000'}/authentication`)



}catch(err){

console.log(err)
  



}

}


 const login = async (req, res) => {
  try {
   
    const userFound = await User.findOne({email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found"});

    const matchPassword = await User.comparePassword(
      req.body.password, userFound.password );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400, 
    });

    res.status(200).json({ token: token ,roles: userFound.roles ,user:userFound});

  } catch (error) {
    console.log(error);
   return  res.status(500).json({message:error})
  }
};

module.exports = {signUp,login,validateEmailToken,sendConfirmationEmail}