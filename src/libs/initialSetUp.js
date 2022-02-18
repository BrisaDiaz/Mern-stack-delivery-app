const { Role } = require("../models/role.model");
const { Category, CATEGORIES } = require("../models/category.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (err) {
    console.error(err);
  }
};

const createAdmin = async () => {
  try {
    const user = await User.findOne({ email: "admin@localhost.com" });

    const roles = await Role.find({ name: { $in: ["admin"] } });

    if (!user) {
      await User.create({
        name: "admin",
        email: "admin@localhost.com",
        password: await bcrypt.hash("admin", 10),
        roles: roles.map((role) => role._id),
      });

      console.log("Admin User Created!");
    }
  } catch (err) {
    console.log(err);
  }
};
const createModerator = async () => {
  try {
    const user = await User.findOne({ email: "moderator@localhost.com" });

    const roles = await Role.find({ name: { $in: ["moderator"] } });

    if (!user) {
      await User.create({
        name: "moderator",
        email: "moderator@localhost.com",
        password: await bcrypt.hash("moderator", 10),
        roles: roles.map((role) => role._id),
      });

      console.log("Moderator User Created!");
    }
  } catch (err) {
    console.log(err);
  }
};
const createCategories = async () => {
  try {
    const count = await Category.estimatedDocumentCount();

    if (count > 0) return;

    const defaultCategories = CATEGORIES.map((category) => ({
      name: category,
    }));

    await Category.create(defaultCategories);
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  createRoles,
  createAdmin,
  createModerator,
  createCategories,
};
