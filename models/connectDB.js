const mongoose = require("mongoose");

const connectDB = () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
        const connected = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connected) {
            console.log(MONGODB_URI);
            console.log("Server has been connected to the DB successfully NextJS");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.connectDB = connectDB;
