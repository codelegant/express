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
	.get(function(req,res){
		res.render('signup', { title: '注册' });
	});
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
