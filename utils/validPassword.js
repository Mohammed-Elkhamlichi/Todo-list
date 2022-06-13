const crypto = require("crypto");

const validPassword = async (salt, hashPassword, inputPassword) => {
   try {
      let hash = await crypto.pbkdf2Sync(inputPassword, salt, 100, 16, "sha512").toString("hex");
      return hashPassword === hash;
   } catch (error) {
      console.log({ password_hash_error: error });
   }
};

export default validPassword;
