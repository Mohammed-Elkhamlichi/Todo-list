import bodyParser from "body-parser";
import deleteTodo from "../../../../controllers/todos/deleteTodo";
import UpdateTodo from "../../../../controllers/todos/updateTodo";
import initMiddleware from "../../../../lib/todos/middleware";
const cors = require("cors");
// DB Connection
import { connectDB } from "../../../../models/connectDB";
const handler = async (req, res) => {
    await initMiddleware(req, res, cors({ methods: ["PATCH", "DELETE"] }));
    bodyParser.json();
    bodyParser.urlencoded({ extended: false });
    const { method } = req;
    switch (method) {
        case "PATCH":
            return UpdateTodo(req, res);
        case "DELETE":
            return deleteTodo(req, res);
        default:
            res.status(400).json({ success: false });
    }
};
export default handler;
