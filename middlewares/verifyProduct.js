const {Category} = require('../models/category.model')

const checkCategoryExist = async(req,res,next) =>{
  try{

  const categoryFound = await Category.find({name: req.body.category}).exec()

  if(!categoryFound) return  req.status(404).json({successful:false, message:'Not category found'})


  next()
  }catch(err){
    console.log(err)

    res.status(500).json({ success:false , message: "Something went wrong, category existens verification fail" });
  }

}

module.exports = checkCategoryExist
