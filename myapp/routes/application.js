var express = require('express');
var application = express.Router();
var multer = require("multer");
var bodyParser = require("body-parser");
var admin = express();

admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({ extended: true }));
admin.get("/", function (req, res, next) {
  console.log(admin.mountpath);
  console.log(req.body);
  req.accepts('html');
  console.log(req.get("accept"));
  res.json(req.body);
  res.end("Admin");
  next();
}, function (req, res, next) {
  console.log(admin.mountpath);
  res.end("Admin-2");
});
// admin.param("id", function (req, res, next, id) {
//   console.info("Param trigger");
//   console.log(id);
//   next();
// });

admin.param(function (param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      console.log("You hit the number 1122");
    }
    console.log("doing param function");
    next();
  };
});

admin.param("page", 1122);
admin.get("/page/:page", function (req, res) {
  res.send("OK");
});

admin.on("mount", function (parent) {
  //console.info(parent);
});
var subadmin = express();
subadmin.get("/", function (req, res) {
  res.end("subadmin");
})

admin.use("/subadmin", subadmin);

module.exports = admin;
