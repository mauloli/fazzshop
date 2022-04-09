const express = require("express");

const Router = express.Router();

const storeController = require("./storeController");

Router.post("/createStore", storeController.createStore);
Router.patch("/updateStore/:id", storeController.updateStore);

module.exports = Router;
