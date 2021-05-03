
const User =require('../models/user.model');
const {Role} =require('../models/role.model');
 require('dotenv').config({path: '.env'})
const jwt =require('jsonwebtoken');


 const signUp = async (req, res) => {
  try {
 
    const { name, email, password, roles } = req.body;

    const newUser = new User({
      name,
      email,
      password: await User.encryptPassword(password),
    });


    if (req.body.roles) {

      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);

    } else {

      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }


    await newUser.save();

 
    return res.status(200).json({ mesage:"user registered" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({error});
  }
};


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

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400, 
    });

    res.status(200).json({ token: token ,roles: userFound.roles ,user:userFound});

  } catch (error) {
    console.log(error);
   return  res.status(500).json({message:error})
  }
};

module.exports = {signUp,login}