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

    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    forums: Array,
    
})

module.exports = mongoose.model("users", newUser)