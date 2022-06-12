const crypto = require("crypto");

const hashPassword = async (salt, password) => {
   try {
      let hash = await crypto.pbkdf2Sync(password, salt, 10000, 8, "sha512").toString("hex");
      return hash;
   } catch (error) {
      console.log({ password_hash_error: error });
   }
};

export default hashPassword;
