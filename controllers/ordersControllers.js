const mongoose = require('mongoose');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const {Order,STATES}  = require('../models/order.model');
const ioObj= require('./../server.js')




const getAllOrders = async (req,res) =>{

let query = {}
     let sort = '-createdAt'
    let page = 1
    let limit = 5


    if(req.query.orderID){
      query.orderID = parseInt(req.query.orderID)
    }
    if(req.query.state){

      if(req.query.state==='finish'){
      query.finished= true
      }
      if(req.query.state==='unfinish'){
 query.finished= false
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

  try {
          const orders = await Order.find(query).sort(sort).limit(limit).skip(skip).populate('client').exec()
     const totalResults = await Order.find(query)

   res.status(200).json({successful:true, data:orders ,total:totalResults.length})

  }catch(err){
    console.log(err)

    res.status(500).json({success:false, message:"Something went wrong, couldn't get orders"})
  }
 
}

const getOrderById =  async (req,res) =>{
try{
  const orderFound =  await Order.findById(req.params.id).populate('client').exec()

    res.status(200).json({successfull:true, data:orderFound})


}catch(err){

  res.status(500).json({success:false , message:"Something went wrong, the state couldn't get order"})
}

     
}


const getAllUserOrders =  async (req,res) =>{

     let sort = '-createdAt'
    let page = 1
    let limit = 5

      if(req.query.page){
      page = parseInt(req.query.page)
    }
     if(req.query.limit){
      limit = parseInt(req.query.limit)
    }
   
     let skip = (page - 1 ) * limit

try{
  const user = await User.findById(req.params.userId)

  const ordersFound =  await Order.find({_id: { $in: user.orders } }).sort(sort).limit(limit).skip(skip).populate('client').exec()

    res.status(200).json({successfull:true, data:ordersFound ,total:user.orders.length })


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

///socket io notification to admins

let adminsClients = ioObj.ioClients.filter(user => user.userRole ==='admin' || user.userRole ==='moderator' )


if(adminsClients !== []){
  adminsClients.forEach(admin => ioObj.io.to(admin.id).emit('newOrder', newOrder) )

}

 res.status(201).json({success: true, message: 'Order creaded successfully'})
 
   }catch(error){
console.log(error)


     res.status(500).json({success:false,  message:"Something went wrong, order couldn't be created"})

   }


 }

 const actualizeOrderState = async (req,res)  =>{
  try{
  
const order = await Order.findById(req.params.id)

  const updatedStates = order.states.map(state => {

   if( state.name === req.confirmedState ){
   return ({ name: req.confirmedState, date: Date.now(), confirmed:true})

   }else{
    return state
   }
  })




let actualizedOrder; 

 if(req.confirmedState ==='liquidado'){

actualizedOrder=  await  User.findByIdAndUpdate(order.client[0],{
  $set: {
    client: true,
  }

},{new:true})

 await Order.findByIdAndUpdate(req.orderId,{$set:{
     states: updatedStates,
   finished:true,

 }},{new:true})

     
order.description.forEach(async item =>{
try{
  await Product.findOneAndUpdate({name: item.product.name},{$inc: {sold: item.quantity},$set:{finished:true}},{new:true})

}catch(err){
  console.log(err)
      res.status(500).json({success:false , message:"Something went wrong, the product sold quantity could not be updated"})
}

})


  }else{


    actualizedOrder=  await Order.findByIdAndUpdate(req.orderId,{$set:{
   states: updatedStates,
 }},{new:true})


  }




 let orderClient =ioObj.ioClients.find(user => user.userId == order.client[0])

    if(orderClient){
      console.log(orderClient)
ioObj.io.to(orderClient.id).emit('orderActualization',actualizedOrder)
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