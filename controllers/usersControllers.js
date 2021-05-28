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
    const user = await User.findById(req.params.id,{password:0}).populate('roles').populate({path:'orders',
  populate:{path:'client'},
  }).exec()

    res.status(200).json( { successful:true ,data:user});

  }catch(error){
    console.log(error)
    res.status(500).json({success:false,message:error.mesage})
  }
 
 }


   const UpdateUserById = async (req,res) =>{
   const { roles } = req.body


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
                address: user.address,
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

  const id =mongoose.Types.ObjectId()
      const user = new User({
      _id:id,
      name,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

 res.status(201).json({success: true , data:{
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    }})
 
   }catch(error){
console.log(error)

     res.status(500).json({success:false,  message:'something went wrong, failt to create user '})

   }
}
const UpdateProfileById = async (req,res) =>{
const { name,lastName,password,newPassword,number} = req.body

 try{ 
 let userFound = await User.findById(req.params.id);

  if (!userFound) return res.status(404).json({success:false, message:'User Not Found'});

  
let encodedPassword;

  if(newPassword && password){

 const matchPassword = await User.comparePassword(
      password, userFound.password );

    if (!matchPassword)
        return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });
    
  encodedPassword = await User.encryptPassword(newPassword) 


  }else{

    encodedPassword= undefined
  }
  
let profileState ;

    if(( req.userAdress  || userFound.address ) && (number || userFound.number) ){
       profileState = 'complited'
    }else{
      profileState='incomplited' 
    }
        
    

            user = await User.findByIdAndUpdate(req.params.id, {
                name: req.userName || userFound.name,
                password: encodedPassword || userFound.password,
                email: userFound.email,
                roles: userFound.roles,
                    address: req.userAdress || userFound.address,
               number: number || userFound.number,
                profileState: profileState,
                 client: userFound.client
,
            }, { new: true });
            updatedUser = await user.save();

            console.log(user.profileState )

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

 