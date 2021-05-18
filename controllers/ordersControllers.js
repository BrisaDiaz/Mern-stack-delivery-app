const Product = require('../models/product.model');
const User = require('../models/user.model');
const Location = require('../models/location.model');
const {Order,STATES}  = require('../models/orders.model');

 const createOrder = async(req,res) =>{
   try{

   
   const {products,userId,location} = req.body
    
   const productsIds =products.map( product => product.id)

   const userFound = User.findById(userId) 

  if(!userFound) return res.status(404).json({successful:false, message:'Not user found'})
  
   const ProductsFound = Product.find({_id: {$in : productsIds}})

     if(!ProductsFound) return res.status(404).json({successful:false, message:'No products found'})

    const locationFound = Location.findById({adress: {$in : location}}) 

  if(!locationFound) return res.status(404).json({successful:false, message:'Not location found'})

let desciption = []
  
products.map(product=> {
  const productInfo = ProductsFound.find(storageProduct =>storageProduct._id === product.id  )

   desciption.push({
     product:product.id , 
     quantity: product.quantity , 
     total: productInfo.price*product.quantity
    
    })

getOrderTotal(productInfo.price*product.quantity)


})

 let total  = 0;

const getOrderTotal = (totalPerProduct) =>{

  return total += totalPerProduct
}

const order =    new Order({
  client: userFound,
  provider: locationFound._id,
  description,
  total,
  states:[{
    name:'placed',
    date: Date.now()
  }]
 })

const newOrder = await order.save( )

 res.status(201).json({success: true, message: 'Order creaded successfully', data: newOrder})
 
   }catch(error){
console.log(error)

     res.status(400).json({success:false,  message:"Something went wrong, order couldn't be created"})

   }


 }

 module.exports = {createOrder}