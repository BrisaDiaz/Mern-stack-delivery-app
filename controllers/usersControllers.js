const User = require('../models/user.model')
const {Role} = require('../models/role.model')

 const getAllUsers = async (req,res) =>{
try{
 const users = await  User.find().populate(
      "roles"
    )

res.status(200).json(users)

}catch(error){

    res.status(500).json({success:false,message:error.mesage})
}
 
 }

  const getUserById = async (req,res) =>{
 try{
    const user = await User.findById(req.params.id,{password:0});

    res.status(200).json(user);

  }catch(error){
    console.log(error)
    res.status(400).json({success:false,message:error.mesage})
  }
 
 }


   const UpdateUserById = async (req,res) =>{
   let { roles } = req.body

   roles = roles ? roles : null;

 try{ 


  
    let rolesFound = await Role.find({ name: { $in: roles } });

    let user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({success:false, message:'user not found'});



            user = await User.findByIdAndUpdate(req.params.id, {
                name: user.name,
                password: user.password,
                email: user.email,
                roles: rolesFound?.map((role) => role._id) || 
                user.roles,
                adress: user.adress,
               number: user.number,
             
            }, { new: true });
            updatedUser = await user.save();

    res.status(200).json({success: true ,data: updatedUser});

  }catch(error){
    console.log(error)
    res.status(500).json({success:false,message:error})
  }
 
 }
 const createUser = async (req,res) =>{
try{
  const { name, email, password, roles } = req.body;
   const rolesFound = await Role.find({ name: { $in: roles } });

      const user = new User({
      name,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

 res.status(200).json({success: true , data:{
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    }})
 
   }catch(error){
console.log(error)

     res.status(500).json({success:false,  message:error.mesage})

   }
}
const UpdateProfileById = async (req,res) =>{
const { roles ,name,password,newPassword,adress,number} = req.body

 try{ 
 let userFound = await User.findById(req.params.id);

  if (!userFound) return res.status(404).json({success:false, message:'User Not Found'});

   const matchPassword = await User.comparePassword(
      password, userFound.password );

    if (!matchPassword)

      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });
    let rolesFound = await Role.find({ name: { $in: roles } });

  (rolesFound?.length > 0 ) ? rolesFound : null;
  
     const encodedPassword = (newPassword) ? await User.encryptPassword(newPassword) : null;



            user = await User.findByIdAndUpdate(req.params.id, {
                name: name || userFound.name,
                password: encodedPassword || ususerFounder.password,
                email: userFound.email,
                roles: rolesFound.map((role) => role._id) || userFound.roles,
                    adress: adress || userFound.adress,
               number: number || userFound.number,
             
            }, { new: true });
            updatedUser = await user.save();

    res.status(200).json({success: true ,message: `User ${updatedUser.name} Udated Successfully`});

  }catch(error){ 
    console.log(error)
    res.status(500).json({success:false,message:error})
  }
}
module.exports = {
  getAllUsers,
getUserById,
createUser,
UpdateUserById,
UpdateProfileById,
}

 