import { connectDB } from "../../../../db/connectDB";
import User from "../../../../users/models/User";
import validPassword from "../../../../utils/validPassword";

const loginHandler = async (req, res) => {
   try {
      await connectDB();
      const { method } = req;
      switch (method) {
         case "POST":
            // Get the User Information from the client Side
            const user = await req.body.user;
            // check if the user exist or not by his email
            const isUserExist = await User.findOne({ email: user.email });
            if (isUserExist) {
               // the existing user slat
               const salt = await isUserExist.salt;
               // the existing user email
               const email = await isUserExist.email;
               // the existing user password hashed.
               const hashPassword = await isUserExist.password;
               // the user password from the clien
               const inputPassword = await user.password;
               // check if the password correct or not
               const isValidPassword = await validPassword(salt, hashPassword, inputPassword);
               console.log({ isValidPassword });
               // If the password is correct
               if (isValidPassword && email === email) {
                  res.status(200).json({ success: true, isValidPassword, isUserExist, msg: "Login Success, Thanks" });
               }
               // If the password is incorrect
               if (!isValidPassword) {
                  res.status(401).json({ success: false, isValidPassword, msg: "Incorrect Password" });
               }
            }
            // If the User Not Exist
            if (!isUserExist) {
               res.status(401).json({ success: false, msg: "Incorrect Email" });
            }
            break;
         default:
            res.status(501).json({ success: false, msg: "HTTP Method Error" });
            break;
      }
   } catch (error) {
      console.log(error);
      res.status(501).json({ success: false, msg: "Server Error" });
   }
};
export default loginHandler;
