const router = require('express').Router();

const {checkDuplicatedCategory, checkCategoryExist} = require('../middlewares/verifyCategory')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')
const {getAllCategories,deleteCategory,editCategoryName,createCategory} = require('../controllers/categoryControllers')

router.get('/',getAllCategories)
router.post('/',[verifyToken,isAdmin],createCategory)
router.put('/:categoryId',[verifyToken,isAdmin,checkCategoryExist],editCategoryName)
router.delete('/:categoryId',[verifyToken,isAdmin,checkCategoryExist],deleteCategory)


module.exports = router