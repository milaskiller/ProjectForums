var express = require('express');
var router = express.Router();
const users = require("../database/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
