
const User = require('../models/user.model');

const {Order,STATES}  = require('../models/order.model');

const checkProfileState = async (req,res,next) => {
  try{
     const userFound = await User.findById(req.userId)

if(userFound.profileState === 'incompleted') return res.status(403).json({successful:false, message:'User can not place an order without basic shipping information'})

next()

  }catch(err){

    console.log(err)


  res.status(500).json({success:false , message:'Something went wrong, profile state verification fail'})
  }

                       
}
const checkOrderExist = async (req,res,next) => {
  try{

    const orderFound = await Order.findById(req.params.orderId);

    if(!orderFound) return res.status(404).json({success:false , message:'Not order found'})
  
   req.orderId = orderFound._id


   next()

  }catch(err){

    console.log(err)
    res.status(500).json({success:false , message:'Something went wrong, order verification fail'})
  
  }
}

const checkAllowedUpdates = async (req,res,next) => {
  try{

  const isValid = STATES.indexOf(req.body.state)

   if( isValid === -1) return res.status(404).json({success:false , message:' state not valid'})


   req.confirmedState= req.body.state

     const orderFound = await Order.findById(req.orderId);

  
     console.log( orderFound.states)

 const findAlreadySetState = orderFound.states.find(state =>( (state.confirmed === true) &&(state.name === req.confirmedState)  )
)

 if(findAlreadySetState) return res.status(400).json({successful:false , message: `State ${req.confirmedState} has already been set`})

 
    

        next()
     
  
      }catch(err){

    console.log(err)
    res.status(500).json({success:false , message:'Something went wrong, allowed updates verification fail'})

  }
}

const checkAllowedDelete  = async (req,res,next) => {
  try{



    const orderFound = await Order.findById(req.params.orderId);

    if(!orderFound) return res.status(404).json({success:false , message:'Not order found'})
   
    if( orderFound.states[1].confirmed ) return res.status(401).json({success:false , message:"Can't delete order once acepted"})
  

   req.orderId = req.params.orderId

   next()
  


  }catch(err){
    console.log(err)

   res.status(500).json({success:false , message:'Something went wrong, order delete  fail'})

  }
}

module.exports = {checkOrderExist,checkAllowedUpdates,checkProfileState,checkAllowedDelete} 
