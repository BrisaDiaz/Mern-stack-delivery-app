const {CATEGORYS} = require('../models/category.model')

const verifyCategoryExist = (req,res,next) =>{
    
  let isValid = CATEGORYS.indexOf(req.category)

  if(isValid === -1) return req.status(404).json({successfull: false,message:'No category found '})
  next()
}
module.exports = {verifyCategoryExist}