const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
SECRET_KEY = "MY_SECRET_KEY_NODE_MONGO";

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.setPassword = (password, email) => {
    // this.salt = crypto.randomBytes(16).toString("hex");
    let splitEmail = email.split("@");
    splitEmail = splitEmail[0];
    this.hash = crypto.pbkdf2Sync(password, splitEmail, 10000, 512, "sha512").toString("hex");
    return this.hash;
};

UserSchema.methods.validPassword = (password, email) => {
    let splitEmail = email.split("@");
    splitEmail = splitEmail[0];
    let hash = crypto.pbkdf2Sync(password, splitEmail, 10000, 512, "sha512").toString("hex");
    return this.hash === hash;
};

UserSchema.methods.generateJWT = (email) => {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            email,
            exp: parseInt(exp.getTime() / 1000),
        },
        SECRET_KEY
    );
};

UserSchema.methods.toAuthJSON = (user, jwt) => {
    return {
        email: user.email,
        token: jwt,
    };
};

UserSchema.plugin(uniqueValidator, {
    message: "Ooops! is already taken.",
});

module.exports.UserModel = mongoose.model("User", UserSchema);
