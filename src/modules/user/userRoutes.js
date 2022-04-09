const express = require("express");

const Router = express.Router();

Router.get("/test", (request, response) => {
  response.status(200);
  response.send("test");
});
