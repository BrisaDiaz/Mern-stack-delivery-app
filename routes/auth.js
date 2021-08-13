const router = require("express").Router();
const {
  login,
  logout,
  signUp,
  getSession,
  validateEmailToken,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
} = require("../controllers/authControllers");
const { checkDuplicatedEmail } = require("../middlewares/verifySignUp");
const { verifyAccountConfirmartion } = require("../middlewares/authJwt.js");
const { checkIsValidUser } = require("../middlewares/userValidator");

router.post("/signUp", [checkDuplicatedEmail, checkIsValidUser], signUp);
router.get("/session", getSession);
router.get("/verification/:token", validateEmailToken);
router.post("/forgotPassword", sendResetPasswordEmail);
router.post("/resetPassword/:token", resetPassword);
router.post("/confirmation", sendConfirmationEmail);
router.post("/login", verifyAccountConfirmartion, login);
router.post("/logout", logout);

module.exports = router;
