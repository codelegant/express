var express = require('express'),
	router = express.Router(),
	filter = require("./../libs/userAuth"),
	querystring = require("querystring"),
	mysql = require("mysql"),
	crypto = require("crypto");
var sqlPool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "express"
});
router.route("/account")
	.get(filter.authorize, function (req, res) {
		res.render("setting/account", { title: "账户设定", path: "/profile", subMenu: req.path });
	})
	.patch(filter.authorize, function (req, res) {
		var data = querystring.parse(req.body.data),
			oldPassword = data.old_password,
			password = data.password,
			passwordAgain = data.password,
			userId = req.cookies.userId;
		if (password === passwordAgain) {
			if (password.length < 6) {
				res.render("setting/account", { title: "账户设定", path: "/profile", subMenu: req.path, msg: "密码长度不能小于六位，请重新输入" });
			} else {
				sqlPool.getConnection(function (err, connection) {
					if (err) {
						console.error("连接错误");
					}
					var md5Password = crypto
						.createHash("md5")
						.update(password, "utf8")
						.digest("hex"),
						md5OldPassword = crypto
							.createHash("md5")
							.update(oldPassword, "utf8")
							.digest("hex");
					var updatePassword = function (password) {
						var queryStr = "UPDATE `user` SET `password`='" + password + "' WHERE `id`='" + userId + "'";
						connection.query(queryStr, function (err, rows) {
							if (err) {
								console.error("插入出错");
								throw err;
							} else {
								res.clearCookie();
								res.redirect("user/signin");
							}
							connection.release();
						});
					}
					var validQueryStr = "SELECT `password` FROM `user` WHERE `id`='" + userId + "'";
					connection.query(validQueryStr, function (err, rows) {
						if (err) {
							console.error("查询出错");
							throw err;
						} else {
							if (rows[0].password !== md5OldPassword) {
								res.render("setting/account", { title: "账户设定", path: "/profile", subMenu: req.path, msg: "用户名的密码不正确，请重新输入" });
							} else {
								return updatePassword(md5Password);
							}
						}
						connection.release();
					});
				});
			}
		} else {
			res.render("setting/account", { title: "账户设定", path: "/profile", subMenu: req.path, msg: "两次密码不匹配，请重新输入" });
		}

	});

router.route("/profile")
	.get(filter.authorize, function (req, res) {
		res.render("setting/profile", { title: "个人资料", path: "/profile", subMenu: req.path });
	});
module.exports = router;