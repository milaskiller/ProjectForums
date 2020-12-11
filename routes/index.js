var express = require("express");
const { nanoid } = require("nanoid");
const Session = require('express-session');
const bodyParser = require('body-parser');
const fs = require("fs")
const path = require("path")

var router = express.Router();
const users = require("../database/users");

var multer  = require('multer')
var upload = multer()


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  
  if (!req.query.error) {
    res.render("login", { err: "null" });
  } else if (req.query.error == "username") {
    res.render("login", { err: "username" });
  } else {
    res.sendStatus(500);
  }

});

router.get("/signup", (req,res) => {
  console.log(req.url)
  res.render("signup")
})

router.post('/signup/auth', upload.single("avatar"), async (req, res, next) => {
  if(req.file.mimetype.includes("gif") || !req.file.mimetype.startsWith("image")) {
    res.sendStatus(403)
  } else {
    users.findOne({username: req.body.username}, async (err, user) => {
      if(err) res.sendStatus(500); console.log(err);
      if(!user) {
        const userID = await nanoid();

        const imagePath = path.join(__dirname, '/../public/images/avatar');
        const fileUpload = new resize(imagePath, userID);
        const filename = await fileUpload.save(req.file.buffer);
        return res.status(200).json({ name: filename });
      }
    })
    
  }
// req.body contains the text fields
})




router.get("/user/:userID", (req, res, next) => {
  users.findOne({ userID: req.params.userID }, (err, user) => {
    if (err) return console.log(err);
    if (!user) {
      res.sendStatus(405);
    } else {
      res.render("user", { user: user });
    }
  });
});



module.exports = router;
