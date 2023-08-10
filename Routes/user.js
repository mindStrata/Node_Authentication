const Router = require("express").Router();
const {
  getHome,
  isAuthentication,
  getLoginUser,
  postLoginUser,
  getRegisterUser,
  postRegisterUser,
  logoutUser,
} = require("../Controllers/user");

// Routes
Router.get("/", getHome)
  .get("/login", isAuthentication, getLoginUser)
  .post("/login", postLoginUser)
  .get("/register", getRegisterUser)
  .post("/register", postRegisterUser)
  .get("/logout", logoutUser);

module.exports = Router;
