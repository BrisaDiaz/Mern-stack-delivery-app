const ObjectId = require('mongoose').Types.ObjectId;

const checkIsValidId =  (req,res,next) =>{

 const isValid = ObjectId.isValid(req.params.id)

 if(!isValid){
res.status(404).json({successful:false, message:'Not found, invalid id'})
 }

 next()
}
module.exports = checkIsValidId