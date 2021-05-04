
const router = require('express').Router();
const {getAllUsers,getUserById,createUser,UpdateUserById,UpdateProfileById} = require('../controllers/usersControllers')
  const {verifyToken,isAdmin } =require('../middlewares/authJwt')
const { checkDuplicateEmail ,checkRolesExisted} = require('../middlewares/verifySingUp');

router.get('/',[verifyToken], getAllUsers);
router.get('/:id',[verifyToken], getUserById);
router.put('/:id',[verifyToken,isAdmin,checkRolesExisted],UpdateUserById);
router.get('/me/:id',[verifyToken],getUserById);
router.put('/me/:id',[verifyToken,checkRolesExisted],UpdateProfileById);
router.post( '/',[verifyToken,isAdmin,checkDuplicateEmail,checkRolesExisted],createUser );




module.exports = router