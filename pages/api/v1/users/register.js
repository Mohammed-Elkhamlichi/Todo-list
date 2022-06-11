import User from "../../../../users/models/User";

const registerHandler = async (req, res) => {
   const { method } = req;
   try {
      switch (method) {
         case "GET":
            console.log({ body: req.body });
            const users = await User.find({});
            return res.status(200).json({ success: true, msg: "success get users", method, users });

         case "POST":
            console.log({ body: req.body });
            const email = req.body.user.email,
               username = req.body.user.username,
               password = req.body.user.password;
            // check if the fields not empty
            if (email && username && password) {
               // check if the user is exist or not
               const isUserExist = await User.findOne({ email });
               console.log({ isUserExist });

               // hash the password
               const passwordHashed = () => {
                  try {
                     return;
                  } catch (error) {
                     console.log({ password_hash_error: error });
                  }
               };
               // valid the password
               const passwordValidate = () => {
                  try {
                     return;
                  } catch (error) {
                     console.log({ password_hash_error: error });
                  }
               };

               // if the user not exist
               if (!isUserExist) {
                  const user = await User.create({ username, email, password });
                  const users = await User.find({});
                  return res.status(200).json({ success: true, msg: "Register Successfully", user, users });

                  // if the user not exist.
               } else {
                  return res.status(200).json({ success: false, msg: "Try an other email or username" });
               }
            } else {
               // if a field is empty or more.
               return res.status(200).json({ success: false, msg: "put all your information" });
            }

         default:
            res.status(501).json({ success: false, msg: "Error" });
      }
   } catch (error) {
      console.log(error);
   }
};
export default registerHandler;
