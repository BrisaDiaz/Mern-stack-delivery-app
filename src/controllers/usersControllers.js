const User = require("../models/user.model");
const { Role } = require("../models/role.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 }).populate(
      "roles"
    );

    return res.status(200).json({ successful: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserRoleById = async (req, res) => {
  const { roles } = req.body;

  try {
    let roleFound = await Role.findOne({ name: roles });

    if (!roleFound)
      return res
        .status(404)
        .json({ success: false, message: "not role provided" });

    let user = await User.findById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { roles: roleFound._id } },
      { new: true }
    );
    updatedUser = await user.save();

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    const id = mongoose.Types.ObjectId();
    const user = new User({
      _id: id,
      name,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

    return res.status(201).json({
      success: true,
      data: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "something went wrong, fail to create user ",
    });
  }
};
const updateProfileById = async (req, res) => {
  const { password, newPassword, userName } = req.body;
  const number = parseInt(req.body.number);

  try {
    let userFound = await User.findById(req.userId);

    if (!userFound)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    let encodedPassword;

    if (newPassword && password) {
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });

      encodedPassword = await User.encryptPassword(newPassword);
    } else {
      encodedPassword = undefined;
    }

    let profileState;

    if (
      (req.userAddress || userFound.address) &&
      (number || userFound.number)
    ) {
      profileState = "completed";
    } else {
      profileState = "uncompleted";
    }

    const updatedUser = await User.findByIdAndUpdate(
      userFound.id,
      {
        name: req.userName || userFound.name,
        password: encodedPassword || userFound.password,
        email: userFound.email,
        roles: userFound.roles,
        address: req.userAddress || userFound.address,
        number: number || userFound.number,
        profileState: profileState,
        client: userFound.client,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: `User updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "server side error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
};
