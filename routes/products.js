
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const { getAllProducts,getProductById,postNewProduct,updateProductById,deleteProductById} =require(
  '../controllers/productsControllers')
  const {verifyToken,isAdmin,isAdminOrIsModerator } =require('../middlewares/authJwt')
const  checkCategoryExist = require('../middlewares/verifyProduct');
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./storage/media')
  },

  filename: function(req,file,cb){
    cb(null,  Date.now()+path.extname(file.originalname))
  },

  
});
const filefilter = (req,file,cb) =>{
  if(!file){
    cb(null,false)
  }else{
    cb(null,true)
  }
}
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter: filefilter
});




router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/',[verifyToken,isAdminOrIsModerator,checkCategoryExist,upload.single('img')],postNewProduct);

router.put('/:id',[verifyToken,isAdmin,upload.single('img')],updateProductById);

router.delete('/:id',[verifyToken,isAdmin], deleteProductById);

module.exports = router