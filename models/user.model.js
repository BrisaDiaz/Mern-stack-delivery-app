const mongoose = require('mongoose')
const Schema = mongoose.Schema ;
const bcrypt = require('bcryptjs');

const userSchema= new Schema ( {
 name:{
   type: String,
   required:true,
lowercase:true,
 trim:true,
 },

 password:{
   type:String,
   required:true,
 },

 email:{
   type:String,
   required:true,
   trim:true,
    index:1
 },
  address:{
   type:String,
   required:false,
   trim:true
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
subscribed:{
type: Boolean,
default:false
},
profileState:{
type: String,
default:'incompleted',
trim:true,
lowercase:true
},
orders:[
  {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
],
client:{type:Boolean , default:false}
},

{
 timestamps: true ,
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