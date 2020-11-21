var express = require('express');
const { nanoid } = require('nanoid');

var router = express.Router();
const users = require("../database/users");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post("/createuser", (req, res, next) => {
  console.log(req.body)
  var userID = nanoid();
  users.create({userID: userID, username: req.body.username, password: req.body.password})
  res.redirect("/user/"+ userID)
})

router.get("/users", (req, res, next) => {
  users.find({}, (err, USERS) => {
    res.render("users", {users: USERS});
  })
})

router.get("/users/:userID", (req, res, next) => {
  users.findOne({userID: req.params.userID}, (err, user) => {
    if(err) return console.log(err)
    if(!user) {
      res.sendStatus(405)
    } else {
      res.render("user", {user: user})
    }
  })
})

module.exports = router;
