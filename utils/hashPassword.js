const crypto = require("crypto");

const hashPassword = async (password, salt) => {
   try {
      let hash = await crypto.pbkdf2Sync(password, salt, 100, 16, "sha512").toString("hex");
      return hash;
   } catch (error) {
      console.log({ password_hash_error: error });
   }
};

export default hashPassword;
