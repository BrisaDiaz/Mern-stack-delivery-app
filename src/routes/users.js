const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  UpdateProfileById,
} = require("../controllers/usersControllers");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const {
  checkDuplicatedEmail,
  checkRolesExisted,
} = require("../middleware/verifySignUp");
const {
  checkIsValidUser,
  checkIsValidUpdate,
} = require("../middleware/userValidator");

router.get("/", [verifyToken], getAllUsers);
router.get("/:id", [verifyToken], getUserById);
router.put(
  "/:id",
  [verifyToken, isAdmin, checkRolesExisted],
  updateUserRoleById
);
router.get("/me/:id", [verifyToken], getUserById);
router.put("/me/:id", [verifyToken, checkIsValidUpdate], UpdateProfileById);
router.post(
  "/",
  [
    verifyToken,
    isAdmin,
    checkDuplicatedEmail,
    checkRolesExisted,
    checkIsValidUser,
  ],
  createUser
);

module.exports = router;
