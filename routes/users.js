
const router = require('express').Router();
const {getAllUsers,getUserById,createUser,updateUserRoleById,UpdateProfileById} = require('../controllers/usersControllers')
  const {verifyToken,isAdmin } =require('../middlewares/authJwt')
const { checkDuplicatedEmail ,checkRolesExisted} = require('../middlewares/verifySingUp');
  const {checkIsValidUser,checkIsValidUpdate} = require('../middlewares/userValidator');

  
router.get('/',[verifyToken], getAllUsers);
router.get('/:id',[verifyToken], getUserById);
router.put('/:id',[verifyToken,isAdmin,checkRolesExisted],updateUserRoleById);
router.get('/me/:id',[verifyToken],getUserById);
router.put('/me/:id',[verifyToken,checkIsValidUpdate],UpdateProfileById);
router.post( '/',[verifyToken,isAdmin,checkDuplicatedEmail,checkRolesExisted,checkIsValidUser],createUser );




module.exports = router