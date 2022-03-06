const router = require("express").Router();

const {
  checkDuplicatedCategory,
  checkCategoryExist,
} = require("../middleware/verifyCategory");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const {
  getAllCategories,
  deleteCategory,
  editCategoryName,
  createCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategories);
router.post(
  "/",
  [verifyToken, isAdmin, checkDuplicatedCategory],
  createCategory
);
router.put(
  "/:id",
  [verifyToken, isAdmin, checkCategoryExist],
  editCategoryName
);
router.delete(
  "/:id",
  [verifyToken, isAdmin, checkCategoryExist],
  deleteCategory
);

module.exports = router;
