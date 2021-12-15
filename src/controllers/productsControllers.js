const Product = require('../models/product.model');
const {Category} = require('../models/category.model')
const fs = require("fs")
const path = require('path');

const cloudinary = require('cloudinary')
//cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_KEY,
  api_secret:process.env.CLOUDINARY_SECRET
})

const getAllProducts = async (req,res) => {
  try{
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


 const imageUploaded = await  cloudinary.v2.uploader.upload(req.file.path)

 const product =    new Product({
   name,
   price,
   category,
   size,
   description,
  active,
  img:imageUploaded.secured_url,
  img_id:imageUploaded.public_id
 })

 fs.unlink(req.file.path, (err) => {
  if (err) {
    console.error(err)
    return
  }
 })



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

 const productFound = await Product.findById(req.params.id)

  if (!productFound) return res.status(404).json({success:false, message:'product not faund'});


let img;
let img_id;

if(req.file){

 const imageUploaded = await  cloudinary.v2.uploader.upload(req.file.path)

fs.unlink(req.file.path, (err) => {
  if (err) {
    console.error(err)
    return
  }
 })


 img =imageUploaded.secure_url
 img_id = imageUploaded.public_id

}else{

img =productFound.img
img_id = productFound.img_id
}




if(category && (category !== productFound.category )){

await Category.decrementCategoryProducts(productFound.category)

await Category.incrementCategoryProducts( category)

}

     const   updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                name: name || productFound.name,
                description: description || productFound.description,
                category: category || productFound.category,
                price: price || productFound.price,
               size: size || productFound.size,
                img,
                img_id,
                active: active || productFound.active
            }, { new: true });


    res.status(200).json({success: true ,data: updatedProduct});

  }catch(error){
    console.log(error)
    res.status(400).json({success:false,message:error.mesage})

}}

const deleteProductById= async (req,res) => {
  try{

 let product = await Product.findById(req.params.id).exec();

  if (!product) return res.status(404).json({success:false, message:'product not faund'});

await Category.decrementCategoryProducts(productFound.category)

await Product.findByIdAndRemove(req.params.id);

await  cloudinary.v2.uploader.destroy(product.img_id)


    res.status(204).json({success:true , message:"Product has been deleted"});

  }catch(error){
    console.log(error)

    res.status(500).json({success:false,message:'something went wrong, product was not delete correctly'})
  }
}
module.exports = {
  getAllProducts,
getProductById,
postNewProduct,
updateProductById,
deleteProductById
}