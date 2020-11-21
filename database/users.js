var mongoose = require("mongoose");


const newUser = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
    },
    username: String,
})

module.exports = mongoose.model("users", newUser)