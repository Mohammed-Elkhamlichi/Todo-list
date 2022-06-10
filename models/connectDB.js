const mongoose = require("mongoose");
const connectDB = () => {
    try {
        const connected = mongoose.connect("mongodb://localhost:27017/todo_list", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connected) {
            console.log("Server has been connected to the DB successfully");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.connectDB = connectDB;
