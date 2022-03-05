const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Role } = require("../models/role.model");
const TemporalUser = require("../models/temporalUser.model");

const verifyToken = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong , can't verify role" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const isAdminOrIsModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator" || roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res
      .status(403)
      .json({ message: "Require Admin or Moderator Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isAdminOrIsModerator,
};
