const router = require('express').Router();
const { subscribeUser} = require('../controllers/newsletterControllers')

router.post('/subscribtion',subscribeUser)

module.exports = router