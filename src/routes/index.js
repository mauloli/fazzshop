const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");
const storeRoutes = require("../modules/store/storeRoutes");

Router.use("/auth", authRoutes);
Router.use("/store", storeRoutes);

module.exports = Router;
