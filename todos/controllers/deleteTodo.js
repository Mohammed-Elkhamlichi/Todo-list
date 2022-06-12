import Todo from "../models/Todo";

// DELETE HTPP METHOD Route
const deleteOneTodo = async (req, res) => {
    try {
        const id = await req.query.id;
        await Todo.deleteOne({ _id: id });
        // get all todos axist after delete one
        const todos = await Todo.find({});
        return res.status(200).json({ success: true, method: "DELETE", todos });
    } catch (error) {
        res.status(501).json({ success: false });
    }
};

export default deleteOneTodo;
