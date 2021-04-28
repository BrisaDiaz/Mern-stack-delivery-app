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

const { name, category, size ,description } = req.body
const price = Number(req.body.price);

 const  img =  req.file.filename;
 const product =    new Product({
   name,
   price,
   category,
   size,
   description,
   img,
 })

const newProduct = await product.save(  )

 res.status(201).json({success: true , data: newProduct})
 
   }catch(error){
console.log(error)
     res.status(400).json({success:false,  message:error.mesage})

   }
}

const updateProductById= async (req,res) => {

const { name, category, size ,description } = req.body
const price = Number(req.body.price);
const  img = (req.file) ?  req.file.filename :  null
  try{
 let product = await Product.findById(req.params.id).exec();

  if (!product) return res.status(404).json({success:false, message:'product not faund'});

let oldImgPath ="./frontend/public/uploads/"+product.img

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
                img: img || product.img
            }, { new: true });
            
            updatedProduct = await product.save();

    res.status(200).json({success: true ,data: updatedProduct});

  }catch(error){
    console.log(error)
    res.status(400).json({success:false,message:error.mesage})

}}

const deleteProductById= async (req,res) => {
  try{
  await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({success:true , message:"Product has been deleted"});
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