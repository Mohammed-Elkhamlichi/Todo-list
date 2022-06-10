import Todo from "../../models/todos/Todo";

// PATCH HTPP METHOD Route
const UpdateOneTodo = async (req, res) => {
    try {
        const isCompleted = (await req.body.completed) || false;
        const title = await req.body.title;
        const id = await req.query.id;
        if (title) {
            var todo = await Todo.findByIdAndUpdate(id, {
                completed: isCompleted,
                title: title,
            });
        } else {
            todo = await Todo.findByIdAndUpdate(id, {
                completed: isCompleted,
            });
        }
        const todos = await Todo.find({});
        return res.status(200).json({ success: true, method: "PATCH", todo, todos });
    } catch (error) {
        res.status(501).json({ success: false });
    }
};
export default UpdateOneTodo;
