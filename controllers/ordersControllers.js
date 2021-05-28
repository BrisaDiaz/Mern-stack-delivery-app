const mongoose = require('mongoose');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const {Order,STATES}  = require('../models/order.model');


const getAllOrders = async (req,res) =>{
  try {
   const orders = await Order.find({}) .populate('client').exec()
   
   res.status(200).json({successful:true, data: orders })

  }catch(err){
    console.log(err)

    res.status(500).json({success:false, message:"Something went wrong, couldn't get orders"})
  }
 
}

const getOrderById =  async (req,res) =>{
try{
  const orderFound =  await Order.findById(req.orderId).populate('client').exec()

    res.status(200).json({successfull:true, data: orderFound})


}catch(err){

  res.status(500).json({success:false , message:"Something went wrong, the state couldn't get order"})
}

     
}
const getAllUserOrders =  async (req,res) =>{
try{
  const user = await User.findById(req.paramas.userId)

  const ordersFound =  await Order.find({_id: { $in: user.orders } })

    res.status(200).json({successfull:true, data: ordersFound})


}catch(err){

  res.status(500).json({success:false , message:"Something went wrong,  couldn't get user orders"})
}

     
}
 const createOrder = async (req,res) =>{
   try{

   const products = JSON.parse(JSON.stringify(req.body)).order
  
   if(!products) return res.status(400).json({successful:false, message:"Order is emty!"})

let description = []
let orderTotal = 0

for(let i = 0 ; i < products.length ; i++){

    let productFound = await Product.findById(products[i].productId)

    if(!productFound) return res.status(404).json({successful:false, message:'No product found'})

        

          let total = products[i].quantity*productFound.price;

          description.push({
           product:{
             name: productFound.name,
             price: productFound.price
           },
           quantity: products[i].quantity,
           total : total
         })

           orderTotal += total


}
    
                   
const id =mongoose.Types.ObjectId()

const newOrder =  new Order({
  _id: id,
  client: req.userId,
  description,
  total:orderTotal,

 })
  
newOrder.createStates()

  await newOrder.save()
 const clientFound  = await User.findById(req.userId)


 await  User.findByIdAndUpdate(req.userId,{
  $set: {
    orders:[...clientFound.orders,id],
  }
},{new:true})


 res.status(201).json({success: true, message: 'Order creaded successfully'})
 
   }catch(error){
console.log(error)
cosole.log(id)

     res.status(500).json({success:false,  message:"Something went wrong, order couldn't be created"})

   }


 }

 const actualizeOrderState = async(req,res)  =>{
  try{
  
const order = await Order.findById(req.params.orderId)

  const updatedStates = order.states.map(state => {

   if( state.name === req.confirmedState ){
   return ({ name: req.confirmedState, date: Date.now(), confirmed:true})

   }else{
    return state
   }
  })

 await Order.findByIdAndUpdate(req.orderId,{$set:{
   states: updatedStates,
 }})



 



 await order.save()

  if(req.confirmedState ==='liquidado'){

  await  User.findByIdAndUpdate(order.client[0],{
  $set: {
    client: true,
  }

},{new:true})

 return
  }
 
  res.status(200).json({success:false , message:'order satate updated successfully'}) 


 }catch(err){
   
   console.log(err)

    res.status(500).json({success:false , message:"Something went wrong, the state couldn't be upgraded"})
 }



 }

const deleteOrderById = async (req,res) =>{
try{

    await Order.findByIdAndRemove(req.orderId);


     const clientFound  = await User.findById(req.userId)

     const actualizedOrders = clientFound.orders.remove(req.orderId)

     await  User.findByIdAndUpdate(req.userId,{
  $set: {
    orders:[...actualizedOrders],
  }
},{new:true})


    res.status(204).json({success:true , message:"Order has been deleted"});

}catch(err){
  console.log(err)

    res.status(500).json({success:false , message:"Order couldn't been deleted"});
}



}

 module.exports = { createOrder, getAllOrders,getOrderById,actualizeOrderState,deleteOrderById,getAllUserOrders}