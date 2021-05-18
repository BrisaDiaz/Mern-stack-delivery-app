const {Role} = require('../models/role.model');
const User = require('../models/user.model');
const OrderState = require('../models/orderSates.model');
const bcrypt = require('bcryptjs')
const createRoles = async () =>{
  try{
const count = await Role.estimatedDocumentCount();

if( count > 0) return ;

const values = await Promise.all([
  new OrderState({name: "placed"}).save(),
  new OrderState({name: "moderator"}).save(),
  new OrderState({name: "admin"}).save(),
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
    });
    console.log('Admin User Created!')
  }
}catch(err){
  console.log(err)
}

};

module.exports = { createRoles,
createAdmin}