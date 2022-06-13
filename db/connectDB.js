const mongoose = require("mongoose");

const connectDB = () => {
   let MONGODB_URI = process.env.MONGODB_URI;
   // let MONGODB_URI = "mongodb://localhost:27017";

   try {
      const connect = mongoose.connect(MONGODB_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      if (connect) console.log("NextJS Connect Success with MongoDB");
   } catch (error) {
      console.log(error);
   }
};

module.exports.connectDB = connectDB;
