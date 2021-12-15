const mongoose = require('mongoose')
const Schema = mongoose.Schema ;


const temporalUserSchema= new Schema ( {
 name:{
   type: String,
   required:true,
     trim: true,
     lowercase:true, 
 },
 password:{
   type:String,
   required:true,
 },

 email:{
   type:String,
   required:true,
   trim:true,
 },
  roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    
emailToken:{
type: String,
require:true
},

 createdAt: { type: Date, default: Date.now },
 expireAt: {
                type: Date,
                 default: Date.now() + 24*60 * 60 * 1000  

            }


}
);



const TemporalUser =mongoose.model('TemporalUser',temporalUserSchema)




module.exports = TemporalUser 