const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Root route
const getHome = (req, res) => {
  res.render("index");
};

// Login middleware
const isAuthentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.newUser = await User.findById(decodeToken._id);
    next();
  } else {
    res.render("login");
  }
};

// GET Login
const getLoginUser = (req, res, next) => {
  res.render("logout", { name: req.newUser.name });
};

// POST Login
const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  let newUser = await User.findOne({ email });
  if (!newUser) {
    return res.redirect("/register");
  }
  const isMatch = await bcrypt.compare(password, newUser.password);
  if (!isMatch) {
    return res.render("login", { email, message: "Wrong Password" });
  }
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_CODE);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/login");
};

// GET Register
const getRegisterUser = (req, res, next) => {
  res.render("register");
};

// POST Register
const postRegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  let newUser = await User.findOne({ email });
  if (newUser) {
    return res.redirect("/login");
  }
  let hashPAss = await bcrypt.hash(password, 10);
  newUser = await User.create({
    name,
    email,
    password: hashPAss,
  });

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_CODE);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/login");
};

// GET Logout
const logoutUser = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/login");
};

module.exports = {
  getHome,
  isAuthentication,
  getLoginUser,
  postLoginUser,
  getRegisterUser,
  postRegisterUser,
  logoutUser,
};
