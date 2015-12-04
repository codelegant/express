var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'xucr'
});

router.route('/signup')
	.get(function (req, res) {
		res.render('signup', { title: '注册', path: req.path });
	});

router.route('/signin')
	.get(function (req, res) {
		res.render('signin', { title: '登录', path: req.path });
	});

module.exports = router;
