const jwt = require("jsonwebtoken");
const generateJWT = async (salt, isValidpassword, username) => {
   try {
      const PRIVATE_KEY = await process.env.PRIVATE_KEY;
      return jwt.sign(
         {
            salt,
            admin: isValidpassword ? true : false,
            username,
         },
         PRIVATE_KEY,
         { algorithm: "HS512" }
      );
   } catch (error) {
      console.log({ error });
   }
};

export default generateJWT;
