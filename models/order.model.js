const mongoose = require('mongoose')

const Schema = mongoose.Schema

const STATES = ['placed','canceled','acepted','in process','shipped','delivered','liquidated'];

const orderSchema= new Schema ( {

 oderID:{type: String,required:true },

 custumer:[{
        type: Schema.Types.ObjectId,
        ref: "User",
      }] ,


 description:[
   {
 product : {
         type: Schema.Types.ObjectId,
        ref: "Product",
  },
  quantity:{ type: Number, default: 1},
  total:{ type: Number, default: 0},
}
],
total:{ type: Number , default: 0},

 provider: [
     {
         type: Schema.Types.ObjectId,
        ref: "Location",
  },
 ],

 states: [
   {
name:{Type:String , default:'placed' ,trim:true},
 date: {Type : Date, default: Date.now}
 }
]
},
{
  timestamps:true,
  versionKey: false,
}
);

 orderSchema.method.getCurrentState = function getCurrentState(){
   return this.states.slice(-1)[0]
 }
const Order = mongoose.model('Order',orderSchema)

module.exports = {Order,STATES} 