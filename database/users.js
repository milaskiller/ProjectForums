var mongoose = require("mongoose");
const newUser = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true,

    },

    Password: {
        type: String,
        required: true,
    },

    Username: {
        type: String,
        required: true,
        unique: true,
    },

    Email: {
        type: String,
        unique: true,
        required: true,
    },

    Forums: {
        type: Array,
    }

})

module.exports = mongoose.model("users", newUser) 