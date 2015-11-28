var express = require('express');
var router = express.Router();
var app = express();
var mysql = require("mysql");
var console = require("better-console");
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "xucr"
});
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.route('/homepage/:id')
	.get(function (req, res, next) {
		if (req.params.id == 0) next('route');
		else next();
	}, function (req, res, next) {
		res.send('你给了我ID: ' + req.params.id);
	})
	.post(function (req, res) {
		res.send('Post homepage');
	});

router.route('/homepage/:id')
	.get(function (req, res, next) {
		res.send('我没有拿到你的ID');
	});

connection.connect(function (err) {
	if (err) {
		console.error("连接错误");
	}
});
router.get('/', function (req, res) {
	connection.query("SELECT * FROM 'album'", function (err, rows, fields) {
		if (err) {
			console.error("查询出错");
			throw err;
		} else {
			console.log(rows);
		}
	});
	res.send('Lai home page');
});
connection.end();

router.get('/user/:id', function (req, res, next) {
	if (req.params.id == 0) next('route');
	else next();
}, function (req, res, next) {
	res.send("You send me a ID");
});
router.get('/user/:id', function (req, res, next) {
	res.send('You did not send me a ID');
});

router.get('/about', function (req, res) {
	res.send('About Lai');
});

router.get('/error', function (req, res) {
	res.status(404).send('Sorry,Not Found.');
});

router.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("服务器出错");
});
module.exports = router;