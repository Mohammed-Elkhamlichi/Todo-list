import Todo from "../models/Todo";
const jwt = require("jsonwebtoken");

// PATCH HTPP METHOD Route
const UpdateOneTodo = async (req, res) => {
   try {
      const PRIVATE_KEY = process.env.PRIVATE_KEY;
      const [Schema, token] = await req.headers.authorization.split(" ");
      const validJwt = await jwt.verify(token, PRIVATE_KEY);
      const author = await validJwt.salt;
      if (Schema === "Todo" && author) {
         const isCompleted = (await req.body.completed) ?? false;
         const title = await req.body.title;
         const id = await req.query.id;
         if (title) {
            var todo = await Todo.findByIdAndUpdate(id, {
               completed: isCompleted,
               title: title,
               author,
            });
         } else {
            todo = await Todo.findByIdAndUpdate(id, {
               completed: isCompleted,
            });
         }
         const todos = await Todo.find({ author });
         return res.status(200).json({ success: true, method: "PATCH", todo, todos });
      } else {
         res.status(401).end;
      }
   } catch (error) {
      res.status(501).json({ success: false });
   }
};
export default UpdateOneTodo;
