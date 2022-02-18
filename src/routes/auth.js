const router = require("express").Router();
const {
  login,
  signUp,
  validateEmailToken,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
} = require("../controllers/authControllers");
const { checkDuplicatedEmail } = require("../middleware/verifySignUp");
const { verifyAccountConfirmation } = require("../middleware/authJwt.js");
const { checkIsValidUser } = require("../middleware/userValidator");

router.post("/signup", [checkDuplicatedEmail, checkIsValidUser], signUp);
router.get("/verification/:token", validateEmailToken);
router.post("/forgotPassword", sendResetPasswordEmail);
router.post("/resetPassword/:token", resetPassword);
router.post("/confirmation", sendConfirmationEmail);
router.post("/login", verifyAccountConfirmation, login);

module.exports = router;
