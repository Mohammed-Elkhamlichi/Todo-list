import Todo from "../../models/todos/Todo";

// POST HTPP METHOD Route
const createOneTodo = async (req, res) => {
    try {
        const title = await req.body.title;
        const findTodo = await Todo.findOne({ title });

        if (!findTodo) {
            // Create new todo and put it in Constant variable
            const todo = await Todo.create({ title });
            // find all Todos after add new todo
            const todos = await Todo.find({});
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
    } catch (error) {
        console.log(error);
        return res.status(501).json({ success: false, msg: "error" });
    }
};

export default createOneTodo;
