const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
let todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Ooops! Title is required"],
        index: true,
    },
    completed: { type: Boolean, default: false },
    created: { type: Date, default: new Date().getDate() },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
