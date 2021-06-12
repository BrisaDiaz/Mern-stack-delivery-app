const router = require('express').Router();

const {createOrder, getAllOrders,getAllUserOrders,getOrderById,actualizeOrderState,deleteOrderById} = require('../controllers/ordersControllers')

  const {verifyToken,isAdmin,isAdminOrIsModerator } =require('../middlewares/authJwt')
  const {checkOrderExist,checkProfileState,checkAllowedDelete,checkAllowedUpdates} =require('../middlewares/verifyOrder')
const checkIsValidId = require('../middlewares/checkIsValidId');

router.get('/',[verifyToken,isAdminOrIsModerator],getAllOrders)

router.post('/',[verifyToken,checkProfileState],createOrder)
router.get('/:orderId',[verifyToken,checkIsValidId],getOrderById)
router.put('/:orderId',[verifyToken,isAdminOrIsModerator,checkOrderExist,checkAllowedUpdates],actualizeOrderState)
router.delete('/:orderId',[verifyToken,checkAllowedDelete],deleteOrderById)
router.get('/my',[verifyToken],getAllUserOrders)


module.exports = router