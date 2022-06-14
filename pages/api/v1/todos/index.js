// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Controllers
import createTodo from "./../../../../todos/controllers/createTodo";
import getAllTodos from "./../../../../todos/controllers/getAllTodos";

// Middlewares
import NextCors from "nextjs-cors";

// DB Connection
import { connectDB } from "../../../../db/connectDB";

const handler = async (req, res) => {
   await NextCors(req, res, {
      methods: ["GET", "POST"],
      origin: ["https://todo-list-mem.vercel.app"],
      optionsSuccessStatus: 201,
   });
   await connectDB();

   const { method } = req;
   switch (method) {
      case "GET":
         return getAllTodos(req, res);
      case "POST":
         return createTodo(req, res);
      default:
         return res.status(400).json({ message: "Invalid HTTP Method" });
   }
};

export default handler;
