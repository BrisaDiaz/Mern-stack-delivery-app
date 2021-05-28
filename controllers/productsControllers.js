const Product = require('../models/product.model');
const fs = require("fs")


const getAllProducts = async (req,res) => {
  try{
    
    const products = await Product.find({});
    res.status(200).json(products);
  }catch(error){
    console.log(error)
    res.status(500).json({success:false, message:error.mesage})
  }
}

const getProductById= async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,message:error.mesage})
  }
}

const postNewProduct = async (req,res) =>{
try{

const { name, category, size ,description ,active} = req.body
const price = Number(req.body.price);
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

const newProduct = await product.save( )

 res.status(201).json({success: true , data: newProduct})
 
   }catch(error){
console.log(error)
     res.status(400).json({success:false,  message:error.mesage})

   }
}

const updateProductById= async (req,res) => {

const { name, category, size ,description ,active} = req.body
const price = Number(req.body.price);

  try{
 let product = await Product.findById(req.params.id).exec();
  if (!product) return res.status(404).json({success:false, message:'product not faund'});


let img;

if(req.file){
  img = req.file.filename
}else{
  img = product.img
}

let oldImgPath ="./storage/media/"+product.img.split("/").reverse()[0]

 if(req.file){
   
fs.unlink(oldImgPath, (err) => {
  if (err) {
    console.error(err)
    return
  }
 })
 }



            product = await Product.findByIdAndUpdate(req.params.id, {
                name: name || product.name,
                description: description || product.description,
                category: category || product.category,
                price: price || product.price,
               size: size || product.size,
                img: img ,
                active: active || product.active
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
 

  await Product.findByIdAndRemove(req.params.id);

    res.status(204).json({success:true , message:"Product has been deleted"});
    
  }catch(error){
    console.log(error)

    res.status(500).json({success:false,message:error.mesage})
  }
}
module.exports = {
  getAllProducts,
getProductById,
postNewProduct,
updateProductById,
deleteProductById
}