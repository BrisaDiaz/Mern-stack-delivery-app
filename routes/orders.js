const router = require('express').Router();

const {createOrder, getAllOrders,getAllUserOrders,getOrderById,actualizeOrderState,deleteOrderById} = require('../controllers/ordersControllers')

  const {verifyToken,isAdmin,isAdminOrIsModerator } =require('../middlewares/authJwt')
  const {checkOrderExist,checkProfileState,checkAllowedDelete,checkAllowedUpdates} =require('../middlewares/verifyOrder')


router.get('/',[verifyToken,isAdminOrIsModerator],getAllOrders)
router.get('/my',[verifyToken],getAllUserOrders)
router.post('/',[verifyToken,checkProfileState],createOrder)
router.get('/:orderId',[verifyToken],getOrderById)
router.put('/:orderId',[verifyToken,isAdminOrIsModerator,checkOrderExist,checkAllowedUpdates],actualizeOrderState)

router.delete('/:orderId',[verifyToken,checkAllowedDelete],deleteOrderById)


module.exports = router