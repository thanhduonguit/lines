"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const path = require("path");

const cookieParser = require("cookie-parser");

const logger = require("morgan"); // const indexRouter = require('./routes/index');


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json"); // Website you wish to allow to connect

  res.setHeader("Access-Control-Allow-Origin", "*"); // Request methods you wish to allow

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"); // Request headers you wish to allow

  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Authorization"); // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  res.setHeader("Access-Control-Allow-Credentials", true); // Pass to next layer of middleware

  next();
});
app.use('/', _index.default); // app.use('/', handleAuth.authorization , indexRouter, handleError.processError);

var _default = app;
exports.default = _default;