const mongoose = require("mongoose");
const User = require("../models/user.model");
const TemporalUser = require("../models/temporalUser.model");
const { Role } = require("../models/role.model");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");

const sendConfirmationEmailFunction = require("../libs/sendConfirmationEmail");
const sendResetPasswordEmailFunction = require("../libs/sendResetPasswordEmail");
const { getCookieValueByName } = require("../utils/getCookieValueByName");

const signUp = async (req, res) => {
  try {
    const { email, password, roles } = req.body;

    const foundTemporalUser = await TemporalUser.findOne({ email });

    const temporalUser =
      foundTemporalUser ||
      new TemporalUser({
        name: req.userName,
        email,
        password,
      });

    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      temporalUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      temporalUser.roles = [role._id];
    }

    const token = jwt.sign(
      {
        id: temporalUser.id,
      },
      process.env.JWT_EMAIL_CONFIRMATION_KEY
    );

    temporalUser.emailToken = token;

    await temporalUser.save();

    return res.status(201).json({
      successful: true,
      message: "User created successfully",
      email: temporalUser.email,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ successful: false, message: "Something went wrong" });
  }
};

const sendConfirmationEmail = async (req, res) => {
  try {
    const userFound = await TemporalUser.findOne({ email: req.body.email });

    const token = userFound.emailToken;

    const url = `${
      process.env.HOST || "localhost:7000"
    }/api/auth/verification/${token}`;

    await sendConfirmationEmailFunction(url, userFound.email);

    return res.status(200).json({
      success: true,
      message: "Account confirmation email has been send successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "something went wrong" });
  }
};
const getSession = async (req, res) => {
  try {
    const cookieToken = getCookieValueByName(
      req.cookies,
      "delivery-app-session-token"
    );

    if (!cookieToken)
      return res
        .status(404)
        .json({ successful: false, message: "No session token was found" });
    /// check if is a valid token
    const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id, { password: 0 }).populate(
      "roles"
    );

    if (!user) return res.status(404).json({ message: "No user found" });

    return res.status(200).json({ successful: true, user, token: cookieToken });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ successful: false, message: "Unauthorized" });
  }
};
const validateEmailToken = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_KEY);

    const id = decoded.id;

    const user = await TemporalUser.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: await User.encryptPassword(user.password),
      roles: user.roles,
    });

    await newUser.save();
    await TemporalUser.findByIdAndRemove(user._id);

    res.redirect(
      `${process.env.HOST || "localhost:3000"}/#/authentication/login`
    );
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });
    const oneDayInSeconds = 86400;

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: oneDayInSeconds,
    });
    res.cookie("delivery-app-session-token", token, {
      expire: oneDayInSeconds + Date.now(),
    });
    return res
      .status(200)
      .json({ token: token, roles: userFound.roles, user: userFound });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("delivery-app-session-token");
    return res
      .status(200)
      .json({ successfully: true, message: "User has logout successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const sendResetPasswordEmail = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound)
      return res.status(422).json({
        successful: false,
        message: "Doesn't exits account link with that email",
      });

    const id = userFound._id;

    const token = jwt.sign(
      {
        id,
        expiration: Date.now() + 10 * 60 * 1000,
      },
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );

    const url = `${
      process.env.HOST || "localhost:3000"
    }/#/authentication/resetPassword/${token}`;

    await sendResetPasswordEmailFunction(url, req.body.email);

    return res.status(200).json({
      success: true,
      message: "Reset password email has been send successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, fail to to send reset password email",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    const token = req.params.token;

    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    if (Date.now() > decoded.expiration)
      return res.status(422).json({
        successful: false,
        message: "Time to reset password exceeded",
      });

    const id = decoded.id;

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: "User not found" });

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ successful: false, message: "Passwords doesn't match" });

    if (newPassword.length < 5)
      return res
        .status(400)
        .json({ successful: false, message: "Passwords min length is 5" });

    const encodedPassword = await User.encryptPassword(newPassword);

    userFound.password = encodedPassword;

    await userFound.save();

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, fail to update password",
    });
  }
};

module.exports = {
  signUp,
  login,
  validateEmailToken,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
  logout,
  getSession,
};
