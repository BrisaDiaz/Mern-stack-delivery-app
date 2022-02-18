const router = require("express").Router();
const { subscribeUser } = require("../controllers/newsletterControllers");

router.post("subscription", subscribeUser);

module.exports = router;
