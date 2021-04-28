const mongoose = require('mongoose')
const Schema = mongoose.Schema ;
const bcrypt = require('bcryptjs');

const userSchema= new Schema ( {
 name:{
   type: String,
   required:true,
     unique: true,
 },
 password:{
   type:String,
   required:true,
 },

 email:{
   type:String,
   required:true,
 },
  adress:{
   type:String,
   required:false,
 },
  number:{
   type:Number,
   required:false,
 },
  roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
},
{
  timestamps:true,
      versionKey: false,
}
);
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}
const User =mongoose.model('User',userSchema)

module.exports = User 