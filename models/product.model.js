const mongoose = require('mongoose')
const Category = require('./category.model')

const Schema = mongoose.Schema

const productSchema= new Schema ( {
 name:{type: String,required:true , lowercase:true,
 trim:true},
 price:{type:Number,required:true,default:0},
 category:{ type: String,required:true ,lowercase:true, trim:true},
 size:{type: String,required:true},
 description:{type: String,required:true,lowercase:true, trim:true},
img:{type: String},
active:{type: Boolean,required:true ,default: true}
 
},
{
  timestamps:true,
     versionKey: false,
}
);

productSchema.methods.setImgUrl = function setImgUrl(filename){

  this.img =` ${process.env.HOST || 'http://localhost:7000' }/media/${filename}`

}

productSchema.post('save',  async function() {
  try{
    let id = this._id
    const categoryFound = await Category.find({name: this.category})
   
     Category.findByIdAndUpdate(categoryFound._id, {$set:{
         quantity: categoryFound.quantity + 1,
         products:[...this.products,id]
        
        } })
         

    categoryFound.save()

  }catch(err){
    console.log(err)
  }
});

const Product = mongoose.model('Product',productSchema)

module.exports = Product 