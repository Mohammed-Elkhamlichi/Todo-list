const mongoose = require("mongoose");

const connectDB = () => {
   try {
      const NODE_ENV = process.env.NODE_ENV
      let dbUri;
      NODE_ENV === "development"
         ? dbUri = process.env.NEXT_PRIVATE_MONGODB_URI_DEVELOPMENT
         : dbUri = process.env.NEXT_PRIVATE_MONGODB_URI_PRODUCTION
      const connect = mongoose.connect(dbUri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      }, (error) => {
         error
            ? console.log("NextJS Connect Error with MongoDB")
            : console.log("NextJS Connect Success with MongoDB")
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports.connectDB = connectDB;
