const express = require("express");

const Router = express.Router();

Router.get("/hello", (request, responese) => {
  responese.status(200);
  responese.send("hello");
});

module.exports = Router;
