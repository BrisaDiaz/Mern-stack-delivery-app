const router = require("express").Router();
const {
  login,
  signUp,
  validateEmailToken,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
  logout,
  getSession,
} = require("../controllers/authControllers");
const { checkDuplicatedEmail } = require("../middleware/verifySignUp");

const { checkIsValidUser } = require("../middleware/userValidator");

router.post("/signup", [checkDuplicatedEmail, checkIsValidUser], signUp);
router.get("/verification/:token", validateEmailToken);
router.get("/logout", logout);
router.get("/session", getSession);
router.post("/forgotPassword", sendResetPasswordEmail);
router.post("/resetPassword/:token", resetPassword);
router.post("/confirmation", sendConfirmationEmail);
router.post("/login", login);
module.exports = router;
