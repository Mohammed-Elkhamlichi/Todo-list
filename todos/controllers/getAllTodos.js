import Todo from "../models/Todo";
const jwt = require("jsonwebtoken");

// GET HTPP METHOD Route
const getAllTodos = async (req, res) => {
   try {
      const PRIVATE_KEY = process.env.PRIVATE_KEY;
      const [Schema, token] = await req.headers.authorization.split(" ");
      const validJwt = await jwt.verify(token, PRIVATE_KEY);

      if (Schema === "Todo" && token) {
         const author = await validJwt.salt.toString();
         const todos = await Todo.find({ author });
         if (!todos) res.status(404).json({ success: false });
         res.status(200).json({ success: true, todos });
      } else {
         res.status(402).end();
      }
   } catch (error) {
      res.status(401).json({ success: false, msg: "UnAuthorized" });
   }
};
export default getAllTodos;
