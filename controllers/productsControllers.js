const Product = require('../models/product.model');
const {Category} = require('../models/category.model')
const fs = require("fs")


const getAllProducts = async (req,res) => {
  try{
    console.log(req.query)

    let query = {}
     let sort = '-createdAt'
    let page = 1
    let limit = 6 

   if(req.query.title){

    query.name={$regex: `${req.query.title}`, $options: 'i'}

    }
    if(req.query.category){
      query.category = req.query.category
    }
    if(req.query.active){

      if(req.query.active==='active'){
      query.active = true
      }
      if(req.query.active==='inactive'){
              query.active = false
      }

    }
    if(req.query.sort){
        sort = req.query.sort
      }
    if(req.query.page){
      page = parseInt(req.query.page)
    }
     if(req.query.limit){
      limit = parseInt(req.query.limit)
    }
   
     let skip = (page - 1 ) * limit

         const products = await Product.find(query).sort(sort).limit(limit).skip(skip).exec()
     const totalResults = await Product.find(query)

    res.status(200).json({success:true,data:products,total:totalResults.length});
  }catch(error){
    console.log(error)
    res.status(500).json({success:false, message:error.mesage})
  }
}

const getProductById= async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json({success:true,data:product});
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,message:error.mesage})
  }
}

const postNewProduct = async (req,res) =>{
try{

const { name, category, size ,description ,active} = req.body
const price = parseInt(req.body.price);
const  img = req.file.filename 

 const product =    new Product({
   name,
   price,
   category,
   size,
   description,
  active,
 })
product.setImgUrl(img)


await Category.findByIdAndUpdate( req.categoryId,{$inc:{ quantity: 1 }},{new : true}  )
const newProduct = await product.save( )

 res.status(201).json({success: true , data: newProduct})
 
   }catch(error){

console.log(error)
     res.status(400).json({success:false,  message:error.mesage})

   }
}

const updateProductById= async (req,res) => {

const { name, category, size ,description ,active} = req.body
const price = parseInt(req.body.price);

  try{
 let productFound = await Product.findById(req.params.id)
  if (!productFound) return res.status(404).json({success:false, message:'product not faund'});


let img;

if(req.file){

  let oldImgPath ="./storage/media/"+productFound.img.split("/").reverse()[0]

 if(req.file){
   
fs.unlink(oldImgPath, (err) => {
  if (err) {
    console.error(err)
    return
  }
 })
 }

  img = req.file.filename

}else{
  img = productFound.img

}




if(category && (category !== productFound.category )){
  
await Category.findOneAndUpdate({name: productFound.category },{$inc:{ quantity: -1 }},{new : true} )

await Category.findByIdAndUpdate( req.categoryId,{$inc:{ quantity: 1 }},{new : true}  )



 
}


            product = await Product.findByIdAndUpdate(req.params.id, {
                name: name || productFound.name,
                description: description || productFound.description,
                category: category || productFound.category,
                price: price || productFound.price,
               size: size || productFound.size,
                img: img ,
                active: active || productFound.active
            }, { new: true });
            
            updatedProduct = await product.save();
    res.status(200).json({success: true ,data: updatedProduct});

  }catch(error){
    console.log(error)
    res.status(400).json({success:false,message:error.mesage})

}}

const deleteProductById= async (req,res) => {
  try{

 let product = await Product.findById(req.params.id).exec();

  if (!product) return res.status(404).json({success:false, message:'product not faund'});

let oldImgPath ="./storage/media/"+product.img.split("/").reverse()[0]

fs.unlink(oldImgPath, (err) => {
  if (err) {
    console.error(err)
    return
  }
 })
 
const productFound = await Product.findById(req.params.id);

await Category.findOneAndUpdate( {name:productFound.category},{$inc:{ quantity: -1 }},{new : true}  )

await Product.findByIdAndRemove(req.params.id);

    


    res.status(204).json({success:true , message:"Product has been deleted"});
    
  }catch(error){
    console.log(error)

    res.status(500).json({success:false,message:error})
  }
}
module.exports = {
  getAllProducts,
getProductById,
postNewProduct,
updateProductById,
deleteProductById
}