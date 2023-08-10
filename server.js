require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const Router = require("./Routes/user");

const server = express();

const PORT = Number.parseInt(process.env.SERVER_PORT)

// Using Middlewares
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", Router);

// View engine
server.set("view engine", "ejs");

server.listen(PORT, () => {
  console.log("Server running on 🚀http://localhost:3000");
});
