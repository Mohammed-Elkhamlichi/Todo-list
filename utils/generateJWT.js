const jwt = require("jsonwebtoken");
const generateJWT = async (salt, isValidpassword) => {
   try {
      const PRIVATE_KEY = await process.env.PRIVATE_KEY;
      return jwt.sign(
         {
            salt,
            admin: isValidpassword ? true : false,
         },
         PRIVATE_KEY,
         { algorithm: "HS512" }
      );
   } catch (error) {
      console.log({ error });
   }
};

export default generateJWT;
