var express = require("express"),
	router = express.Router(),
	mysql = require("mysql"),
	crypto = require("crypto"),
	filter = require("./../libs/userAuth");
var sqlPool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "express"
});

router.route("/signup")
	.get(function (req, res) {
		res.render("user/signup", { title: "注册", path: req.path });
	})
	.post(function (req, res) {
		console.log(req.body);
		var params = req.body,
			username = params.username,
			password = params.password,
			passwordAgain = params.password_again;
		if (password === passwordAgain) {
			if (password.length < 6) {
				res.render("user/signup", { title: "注册", path: req.path, msg: "密码长度不能小于六位，请重新输入" });
			} else {
				sqlPool.getConnection(function (err, connection) {
					if (err) {
						console.error("连接错误");
					}
					var md5Password = crypto
						.createHash("md5")
						.update(password, "utf8")
						.digest("hex");
					var addUser = function (username, password) {
						var queryStr = "INSERT INTO `user`(`username`, `password`) VALUES ('" + username + "','" + password + "')";
						connection.query(queryStr, function (err, rows) {
							if (err) {
								console.error("插入出错");
								throw err;
							} else {
								res.redirect("/signin");
							}
							connection.release();
						});
					}
					var validQueryStr = "SELECT * FROM `user` WHERE `username`='" + username + "'";
					connection.query(validQueryStr, function (err, rows) {
						if (err) {
							console.error("查询出错");
							throw err;
						} else {
							if (rows.length > 0) {
								res.render("user/signup", { title: "注册", path: req.path, msg: "当前用户名已经被使用，请使用其它用户名" });
							} else {
								return addUser(username, md5Password);
							}
						}
						connection.release();
					});
				});
			}
		} else {
			res.render("user/signup", { title: "注册", path: req.path, msg: "两次密码不匹配，请重新输入" });
		}
	});

router.route("/signin")
	.get(function (req, res) {
		if (req.cookies.userId) {
			res.render("user/success", { title: "登入", path: req.path, isLogin: true });
		} else {
			res.render("user/signin", { title: "登入", path: req.path });
		}
	})
	.post(function (req, res) {
		var params = req.body,
			username = params.username,
			password = params.password;
		sqlPool.getConnection(function (err, connection) {
			if (err) {
				console.error("连接错误");
			}
			var queryStr = "SELECT `id`,`password` FROM `user` WHERE `username`='" + username + "'";
			connection.query(queryStr, function (err, rows) {
				if (err) {
					console.error("查询出错");
					throw err;
				} else {
					var md5Password = crypto
						.createHash("md5")
						.update(password, "utf8")
						.digest("hex");
					if (md5Password === rows[0].password) {
						res.cookie("userId", rows[0].id);
						res.render("user/success", { title: "登入", isLogin: false, path: req.path });
					}
				}
				connection.release();
			});
		});
	});

router.route("/signout")
	.get(function (req, res) {
		res.clearCookie("userId");
		res.redirect("/signin");
	});

module.exports = router;