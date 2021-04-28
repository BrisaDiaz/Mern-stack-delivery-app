
const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const { getAllProducts,getProductById,postNewProduct,updateProductById,deleteProductById} =require(
  '../controllers/productsControllers')
  const {verifyToken,isAdmin,isModerator } =require('../middlewares/authJwt')

const storage = multer.diskStorage({
  
  destination: function(req,file,cb){
    cb(null,'./frontend/public/uploads')

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

router.post('/',upload.single('img'),[verifyToken,isAdmin],postNewProduct);

router.put('/:id',upload.single('img'),[verifyToken,isAdmin],updateProductById);

router.delete('/:id',[verifyToken,isAdmin], deleteProductById);

module.exports = router