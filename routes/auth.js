const router = require('express').Router();
const {login,signUp} = require('../controllers/authControllers');
const {checkDuplicateEmail} =require('../middlewares/verifySingUp');


router.post('/singup',checkDuplicateEmail, signUp);

router.post('/login', login);

module.exports = router