var express = require('express'),
	router = express.Router(),
	filter=require("./../libs/userAuth");
router.route("/account")
	.get(filter.authorize, function (req, res) {
		res.render("setting/account", { title: "账户设定", path: "/profile", subMenu: req.path });
	})
	.post(filter.authorize, function (req, res) {

	});

router.route("/profile")
	.get(filter.authorize, function (req, res) {
		res.render("setting/profile", { title: "个人资料", path: "/profile", subMenu: req.path });
	});
module.exports = router;