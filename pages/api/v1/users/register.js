import User from "../../../../users/models/User";
const crypto = require("crypto");
import hashPassword from "../../../../utils/hashPassword";
const registerHandler = async (req, res) => {
   const { method } = req;
   try {
      switch (method) {
         case "GET":
            console.log({
               body: req.body,
            });
            const users = await User.find({});
            return res.status(200).json({
               success: true,
               msg: "success get users",
               method,
               users,
            });

         case "POST":
            console.log({ body: req.body });

            let email = req.body.user.email,
               username = req.body.user.username,
               password = req.body.user.password;
            // check if the fields not empty
            if (email && username && password) {
               // check if the user is exist or not
               const isUserExist = await User.findOne({ email });
               // if the user not exist
               if (!isUserExist) {
                  // Set a salt for this User
                  const salt = await crypto.randomBytes(16).toString("hex");
                  console.log({ salt });
                  // hash the password
                  password = await hashPassword(salt, password);
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
                  return res.status(200).json({
                     success: false,
                     msg: "Try an other email or username",
                  });
               }
            } else {
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
      }
   } catch (error) {
      console.log(error);
   }
};
export default registerHandler;
