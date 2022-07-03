const mongoose = require("mongoose");
import dbUriManager from "../utils/dbUriManager";

const connectDB = () => {
   try {
      const connect = mongoose.connect(dbUriManager(), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      if (connect) console.log("NextJS Connect Success with MongoDB");
   } catch (error) {
      console.log(error);
   }
};

module.exports.connectDB = connectDB;
