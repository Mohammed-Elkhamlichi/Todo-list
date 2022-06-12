import Todo from "../models/Todo";

// GET HTPP METHOD Route
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        if (!todos) res.status(404).json({ success: false });
        res.status(200).json({ success: true, todos });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};
export default getAllTodos;
