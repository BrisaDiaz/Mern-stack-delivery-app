const { Category } = require("../models/category.model");

const checkDuplicatedCategory = async (req, res, next) => {
  try {
    const categoryFound = await Category.findOne({ name: req.body.category });

    if (categoryFound)
      return req
        .status(409)
        .json({ successful: false, message: "The category already exist" });

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong,  duplicated category verification fail",
    });
  }
};

const checkCategoryExist = async (req, res, next) => {
  try {
    const categoryFound = await Category.findById(req.params.id);

    if (!categoryFound)
      return req
        .status(404)
        .json({ successful: false, message: "Not category found" });

    req.id = categoryFound._id;
    req.categoryName = categoryFound.name;

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong, category existence verification fail",
    });
  }
};

module.exports = { checkDuplicatedCategory, checkCategoryExist };
