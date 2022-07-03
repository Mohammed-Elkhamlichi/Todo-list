const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "MY_SECRET_KEY_NODE_MONGO";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username can't be blank"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email can't be blank"],
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
    },

    hash: String,
    salt: String,
});


module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
