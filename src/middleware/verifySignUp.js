const User = require("../models/user.model");
const TemporalUser = require("../models/temporalUser.model");
const { ROLES } = require("../models/role.model");

const checkDuplicatedEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "The email already exists" });

    const tempUser = await TemporalUser.findOne({ email: req.body.email });

    if (tempUser)
      return res.status(302).json({
        successful: false,
        message: "Email unverified",
        redirect: `/#/authentication/confirmation`,
        id: tempUser._id,
      });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong , signup fail" });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

module.exports = { checkDuplicatedEmail, checkRolesExisted };
