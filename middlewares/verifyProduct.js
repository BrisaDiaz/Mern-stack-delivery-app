const {Category} = require('../models/category.model')


const checkCategoryExist = async (req,res,next) =>{

  try{

  const categoryFound = await Category.findOne({name: req.body.category})



  if(!categoryFound) return  res.status(404).json({successful:false, message:'Not category found'})

 req.categoryId = categoryFound._id


  next()
  }catch(err){
    console.log(err)

    res.status(500).json({ success:false , message: "Something went wrong, category existens verification fail" });
  }

}


module.exports = checkCategoryExist
