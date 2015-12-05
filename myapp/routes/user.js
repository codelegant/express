var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var crypto = require("crypto");
var md5 = crypto.createHash("md5");

var sqlPool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "express"
});

router.route("/signup")
	.get(function (req, res) {
		res.render("signup", { title: "注册", path: req.path });
	})
	.post(function (req, res) {
		console.log(req.body);
		var params = req.body,
			username = params.username,
			password = params.password,
			passwordAgain = params.password_again;
		if (password === passwordAgain) {
			if (password.length < 6) {
				res.render("signup", { title: "注册", path: req.path, msg: "密码长度不能小于六位，请重新输入" });
			} else {
				md5.update(password);
				var md5Password = md5.digest("hex");
				sqlPool.getConnection(function (err, connection) {
					if (err) {
						console.error("连接错误");
					}
					var queryStr = "INSERT INTO user(username, password) VALUES ('" + username + "','" + md5Password + "')";
					connection.query(queryStr, function (err, rows) {
						if (err) {
							console.error("插入数据出错");
							throw err;
						} else {
							res.redirect("/signin");
						}
						connection.release();
					});
				});
			}
		} else {
			res.render("signup", { title: "注册", path: req.path, msg: "两次密码不匹配，请重新输入" });
		}
	});

router.route("/signin")
	.get(function (req, res) {
		res.render("signin", { title: "登录", path: req.path });
	})
	.post(function (req, res) {
		var params = req.body;
		username = params.username;
		password = params.password;
	});

module.exports = router;
