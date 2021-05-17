const {Role} = require('../models/role.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const createRoles = async () =>{
  try{
const count = await Role.estimatedDocumentCount();

if( count > 0) return ;

const values = await Promise.all([
  new Role({name: "user"}).save(),
  new Role({name: "moderator"}).save(),
  new Role({name: "admin"}).save(),
]);

console.log(values)

  }catch(err){
    console.error(err)
  }
} 


 const createAdmin = async () => {
try{

    const user = await User.findOne({ email: "admin@localhost.com" });

  const roles = await Role.find({ name: { $in: ["admin"] } });

  if (!user) {
 
    await User.create({
      name: "admin",
      email: "admin@localhost.com",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
      confirmed:true
    });
    console.log('Admin User Created!')
  }
}catch(err){
  console.log(err)
}

};

module.exports = { createRoles,
createAdmin}