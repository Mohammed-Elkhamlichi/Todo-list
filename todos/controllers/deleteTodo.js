import Todo from "../models/Todo";
const jwt = require("jsonwebtoken");

// DELETE HTPP METHOD Route
const deleteOneTodo = async (req, res) => {
   try {

      const PRIVATE_KEY = await process.env.PRIVATE_KEY;
      const id = await req.query.id;
      const [Schema, token] = await req.headers.authorization.split(" ");
      const validJwt = await jwt.verify(token, PRIVATE_KEY);
      const author = validJwt.salt;


      if (Schema === "Todo" && author) {
         await Todo.deleteOne({ _id: id });
         // get all todos axist after delete one
         const todos = await Todo.find({ author });
         return res.status(200).json({ success: true, method: "DELETE", todos });
      } else {
         res.status(401).end();
      }
   } catch (error) {
      res.status(501).json({ success: false });
   }
};

export default deleteOneTodo;
