const mongoose = require('mongoose')

const Schema = mongoose.Schema


// the orden is important !!

const STATES = ['enviado','aceptado','despachado','entregado','liquidado'];



const orderSchema= new Schema ( {

 orderID:{type: Number ,default: Date.now },

 client:[{
        type: Schema.Types.ObjectId,
        ref: "User",
      }] ,


description: [
{  
product : {
name:{type:String ,require:true ,trim:true, lowercase:true},
price:{type: Number, default:0},

  },
  quantity:{ type: Number, default: 1},
  total:{ type: Number, default: 0},
}
],

total:{ type: Number , default: 0},

 states:[
 {
name:{type:String, default:''},
confirmed:{type: Boolean , default:false},
date: {type : Date}
 },
]
},
{
  timestamps:true,
  versionKey: false,
}
);

orderSchema.methods.createStates = function createStates(){

  this.states= STATES.map(state => {
    if(state === 'enviado') return (
      {name: state ,confirmed:true,date: Date.now()})
  
  return ( {name: state ,confirmed:false})
         
  })

}
const Order = mongoose.model('Order',orderSchema)

module.exports = {Order,STATES} 