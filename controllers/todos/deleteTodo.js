import Todo from "../../models/todos/Todo";

// DELETE HTPP METHOD Route
const deleteOneTodo = async (req, res) => {
    try {
        const id = await req.query.id;
        console.log({ id });
        await Todo.deleteOne({ _id: id });
        // get all todos axist after delete one
        const todos = await Todo.find({});
        return res.status(200).json({ success: true, method: "DELETE", todos });
    } catch (error) {
        console.log(error);
    }
};

export default deleteOneTodo;
