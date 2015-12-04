var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "xucr"
});

router.route("/signup")
	.get(function (req, res) {
		res.render("signup", { title: "注册", path: req.path});
	})
	.post(function (req, res) {
		console.log(req.body);
		var params = req.body,
			username = params.username,
			password = params.password,
			passwordAgain = params.password_again;
		if (password === passwordAgain) {
		} else {
			res.render("signup",{title:"注册",path:req.path,msg:"两次密码不匹配，请重新输入"});
		}
	});

router.route("/signin")
	.get(function (req, res) {
		res.render("signin", { title: "登录", path: req.path });
	});

module.exports = router;
