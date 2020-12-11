var express = require("express");
var http = require("http").createServer(express);
var io = require("socket.io")(http);
var router = express.Router();
var path = require("path")

router.get("/", (req, res, next) => {
    res.redirect("/minecraft/stats")
})

router.get("/stats", (req, res, next) => {
    res.render("minecraftStats")
})


//io connections

io.on("connection", (socket) => {
    console.log("new user connected to see stats")

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

http.listen(3000, () => {
    console.log("listening on port 3005")
})

module.exports = router;