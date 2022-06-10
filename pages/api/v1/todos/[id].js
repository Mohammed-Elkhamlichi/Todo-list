import deleteTodo from "../../../../controllers/todos/deleteTodo";
import UpdateTodo from "../../../../controllers/todos/updateTodo";
import initMiddleware from "../../../../lib/todos/middleware";
const cors = require("cors");

const handler = async (req, res) => {
    await initMiddleware(req, res, cors({ methods: ["PATCH", "DELETE"] }));
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
