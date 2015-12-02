var express = require('express');
var application = express.Router();
var multer = require("multer");
var bodyParser = require("body-parser");
var admin = express();

admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({ extended: true }));
admin.get("/", function (req, res) {
  //添加响应头
  res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
  res.append('Warning', '199 Miscellaneous warning');
  
  res.download("images/logo.jpg","logo.jpg");
  
  console.log(admin.mountpath);
  console.log(req.get("accept"));
  console.log(res.headersSent);
  res.set('Content-Type', 'text/html');
  res.type("json");
  res.json(req.body);
  // res.send("Admin");
  console.log(res.headersSent);
});
// admin.param("id", function (req, res, next, id) {
//   console.info("Param trigger");
//   console.log(id);
//   next();
// });

// admin.param(function (param, option) {
//   return function (req, res, next, val) {
//     if (val == option) {
//       console.log("You hit the number 1122");
//     }
//     console.log("doing param function");
//     next();
//   };
// });

// admin.param("page", 1122);
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
