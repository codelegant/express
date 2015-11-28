var express = require('express');
var router = express.Router();
var app = express();
// router.use(function timeLog(req, res, next) {
// 	console.log('Time: ', Date.now());
// });

router.route('/homepage')
	.get(function (req, res) {
		res.send('Get homepage');
	})
	.post(function (req, res) {
		res.send('Post homepage');
	});
router.get('/', function (req, res) {
	res.send('Lai home page');
});

router.get('/about', function (req, res) {
	res.send('About Lai');
});

router.get('/error', function (req, res) {
	res.status(404).send('Sorry,Not Found.');
});

module.exports = router;