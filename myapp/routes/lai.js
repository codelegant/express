var express = require('express');
var router = express.Router();
var app = express();
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
		res.send('I have not recived your ID');
	});

router.get('/', function (req, res) {
	res.send('Lai home page');
});

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

router.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500).send("Something Broken!");
});
module.exports = router;