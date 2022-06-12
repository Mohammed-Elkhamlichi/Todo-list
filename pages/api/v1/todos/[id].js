import deleteTodo from "./../../../../todos/controllers/deleteTodo";
import UpdateTodo from "./../../../../todos/controllers/updateTodo";
import { connectDB } from "../../../../db/connectDB";
import NextCors from "nextjs-cors";

const handler = async (req, res) => {
   // Cors
   await NextCors(req, res, {
      methods: ["PATCH", "DELETE"],
      origin: ["http://localhost:3000", "https://todo-list-mem.vercel.app"],
      optionsSuccessStatus: 201,
   });
   // DB connection
   await connectDB();
   const { method } = req;
   switch (method) {
      case "PATCH":
         return UpdateTodo(req, res);
      case "DELETE":
         return deleteTodo(req, res);
      default:
         res.status(400).json({ success: false });
         break;
   }
};
export default handler;
