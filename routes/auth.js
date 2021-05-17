const router = require('express').Router();
const {login,signUp,validateEmailToken,sendConfirmationEmail} = require('../controllers/authControllers');
const {checkDuplicateEmail} =require('../middlewares/verifySingUp');
const {verifyAccountConfirmartion} =  require('../middlewares/authJwt.js');

router.post('/singup',checkDuplicateEmail, signUp);
router.get('/verification/:token',validateEmailToken);
router.post('/confirmation',sendConfirmationEmail);
router.post('/login',verifyAccountConfirmartion, login);

module.exports = router