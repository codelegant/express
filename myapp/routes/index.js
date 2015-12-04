var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '主页', path: req.path });
});
router.get('/here', function (req, res) {
  res.send('这里是Index');
});
module.exports = router;
