import Todo from "../models/Todo";
const jwt = require("jsonwebtoken");
import User from "../../users/models/User";

// POST HTPP METHOD Route
const createOneTodo = async (req, res) => {
   try {
      const PRIVATE_KEY = process.env.PRIVATE_KEY;
      const [Schema, token] = await req.headers.authorization.split(" ");
      const validJwt = await jwt.verify(token, PRIVATE_KEY);

      if (validJwt && Schema === "Todo") {
         const salt = await validJwt.salt;
         const user = await User.findOne({ salt });
         if (user) {
            const author = salt;
            const title = await req.body.title;
            const findTodo = await Todo.findOne({ title, author });
            const created = new Date().getTime();

            if (!findTodo) {
               // Create new todo and put it in Constant variable
               const todo = await Todo.create({ title, author, created });
               // find all Todos after add new todo
               const todos = await Todo.find({ author });
               return res.status(200).json({
                  success: true,
                  msg: "todo add successfuly",
                  method: "POST",
                  body: req.body,
                  todos,
                  todo,
               });
            } else {
               return res.status(202).json({ success: false, msg: "Todo already exist" });
            }
         }
      }
   } catch (error) {
      return res.status(501).json({ success: false, msg: "error" });
   }
};

export default createOneTodo;
