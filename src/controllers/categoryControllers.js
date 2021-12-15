const {Category} = require('../models/category.model')
const Products = require('../models/product.model')

const getAllCategories = async  (req,res) =>{
  try{

const categories = await Category.find({})

 res.status(200).json({successful : true , data: categories })

  }catch(err){

    console.log(err)
res.status(500).json({successful:false ,message:'Something went wrong, could not get all categories'})
  }
  

}

const createCategory = async (req,res) => {
   try {

const newCategory = new Category({name: req.body.category})
 await newCategory.save()

 res.status(201).json({successful:true ,message:`Category ${newCategory} created successfully`})

   }catch(err){
   
    console.log(err)
res.status(500).json({successful:false ,message:'Something went wrong, could create new category'})
   }

}
const deleteCategory= async  (req,res)=>{
try{

  await Category.findByIdAndRemove(req.categoryId )
await Products.deleteMany({category:req.categoryName})

res.status(204).json({successful:false ,message:`Category ${req.categoryName} successfully deleted`})

}catch(err){
console.log(err)

res.status(500).json({successful:false ,message:'Something went wrong, could delate category'})
}
}

const editCategoryName= async (req,res) =>{
try{

await Category.findByIdAndUpdate(req.categoryId,{$set:{name:req.body.categoryNewName}})

await Products.updateMany({category: req.categoryName}, {category: req.body.categoryNewName})

res.status(200).json({successful:false ,message:`Category ${req.categoryName} successfully edited to ${req.body.categoryNewName}`})

}catch(err){
console.log(err)

res.status(500).json({successful:false ,message:'Something went wrong, could not delate category'})
}
}
 

 module.exports = {getAllCategories,deleteCategory,editCategoryName,createCategory}