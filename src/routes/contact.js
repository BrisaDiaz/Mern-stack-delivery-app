const router = require("express").Router();

const { sendToAdminEmail } = require("../controllers/contactControllers");

router.post("/", sendToAdminEmail);

module.exports = router;
