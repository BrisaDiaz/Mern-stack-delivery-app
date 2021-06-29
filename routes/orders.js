const router = require('express').Router();

const {createOrder, getAllOrders,getAllUserOrders,getOrderById,actualizeOrderState,deleteOrderById} = require('../controllers/ordersControllers')

  const {verifyToken,isAdmin,isAdminOrIsModerator } =require('../middlewares/authJwt')
  const {checkOrderExist,checkProfileState,checkAllowedDelete,checkAllowedUpdates,checkAuthorizedUser} =require('../middlewares/verifyOrder')
const checkIsValidId = require('../middlewares/checkIsValidId');

router.get('/',[verifyToken,isAdminOrIsModerator],getAllOrders)
router.post('/',[verifyToken,checkProfileState],createOrder)
router.get('/:id',[verifyToken,checkIsValidId],getOrderById)
router.put('/:id',[verifyToken,isAdminOrIsModerator,checkOrderExist,checkAllowedUpdates],actualizeOrderState)
router.delete('/:id',[verifyToken,checkAllowedDelete],deleteOrderById)
router.get('/user/:userId',[verifyToken,checkAuthorizedUser],getAllUserOrders)


module.exports = router