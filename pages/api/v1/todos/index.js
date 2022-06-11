// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Controllers
import createTodo from "./../../../../todos/controllers/createTodo";
import getAllTodos from "./../../../../todos/controllers/getAllTodos";

import initMiddleware from "../../../../utils/middleware";
// Middlewares
const cors = require("cors");

// DB Connection
import { connectDB } from "../../../../db/connectDB";

const handler = async (req, res) => {
   await initMiddleware(req, res, cors({ methods: ["GET", "POST"] }));
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
