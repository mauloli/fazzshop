const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");
const routerNav = require("./routes");

const app = express();
const port = 3001;

// midlleware
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routerNav);
app.use("/*", (request, responese) => {
  responese.status(404).send("Path not Found");
});

app.listen(port, () => {
  console.log(`express app is listen port ${port} !`);
});
