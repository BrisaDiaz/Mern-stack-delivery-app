const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema= new Schema ( {
 name:{type: String,required:true ,    unique: true,},
 price:{type:Number,required:true},
 category:{ type: String,required:true},
 size:{type: String,required:true},
 description:{type: String,required:true},
img:{type: String},
active:{type: Boolean,required:true}
 
},
{
  timestamps:true,
     versionKey: false,
}
);
const Product = mongoose.model('Product',productSchema)

module.exports = Product 