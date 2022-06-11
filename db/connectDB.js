const mongoose = require("mongoose");

const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
        const connected = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connected) {
            console.log("NextJS Connect Success with MongoDB");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.connectDB = connectDB;
