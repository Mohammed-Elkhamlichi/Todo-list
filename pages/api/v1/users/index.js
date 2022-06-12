import { connectDB } from "../../../../db/connectDB";
import User from "../../../../users/models/User";
import NextCors from "nextjs-cors";

const users = async (req, res) => {
   try {
      await NextCors(req, res, { methods: ["GET"], origin: "*", optionsSuccessStatus: 201 });

      const { method } = req;
      switch (method) {
         case "GET":
            await connectDB();
            const users = await User.find({});
            res.status(201).json({ success: true, users });
         default:
            res.status(501).send("HTTP Method ERROR");
      }
   } catch (error) {
      res.status(501).send("ERROR");
   }
};

export default users;
