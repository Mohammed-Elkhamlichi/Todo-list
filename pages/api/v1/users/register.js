import { connectDB } from "../../../../db/connectDB";
import User from "../../../../users/models/User";
const crypto = require("crypto");
import hashPassword from "../../../../utils/hashPassword";
import NextCors from "nextjs-cors";

const registerHandler = async (req, res) => {
   await NextCors(req, res, {
      methods: ["POST"],
      origin: ["https://todo-list-mem.vercel.app"],
      optionsSuccessStatus: 201,
   });
   await connectDB();
   const { method } = req;
   try {
      switch (method) {
         case "POST":
            console.log({ body: req.body });

            let email = req.body.user.email,
               username = req.body.user.username,
               password = req.body.user.password;
               
            // check if the fields not empty
            if (email && username && password) {
               // check if the user is exist or not
               const isUserExist = await User.findOne({ username, email });
               console.log({ isUserExist });
               // if the user not exist
               if (isUserExist === null) {
                  // Set a salt for this User
                  const salt = await crypto.randomBytes(16).toString("hex");
                  console.log({ salt });
                  // hash the password
                  password = await hashPassword(password, salt);
                  console.log({ password });
                  // Create New User
                  const user = await User.create({ username, email, password, salt });
                  // Get All Users
                  const users = await User.find({});
                  // Send Response To The Cleint
                  return res.status(200).json({
                     success: true,
                     msg: "Register Successfully",
                     user,
                     users,
                  });

                  // if the user not exist.
               } else {
                  console.log("Try an other email or username");
                  return res.status(200).json({
                     success: false,
                     msg: "Try an other email or username",
                  });
               }
            } else {
               console.log("ffffme");
               // if a field is empty or more.
               return res.status(200).json({
                  success: false,
                  msg: "put all your information",
               });
            }
         default:
            res.status(501).json({
               success: false,
               msg: "Error",
            });
            break;
      }
   } catch (error) {
      console.log(error);
   }
};
export default registerHandler;
