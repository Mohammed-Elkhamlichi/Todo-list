// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Controllers
import createTodo from "../../../../controllers/todos/createTodo";
import getAllTodos from "../../../../controllers/todos/getAllTodos";

import initMiddleware from "../../../../lib/todos/middleware";
// Middlewares
const cors = require("cors");
const bodyParser = require("body-parser");

// models
import Todo from "../../../../models/todos/Todo";
// DB Connection
import { connectDB } from "../../../../models/connectDB";

const handler = async (req, res) => {
    await initMiddleware(req, res, cors({ methods: ["GET", "POST"] }));
    bodyParser.json();
    bodyParser.urlencoded({ extended: false });
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