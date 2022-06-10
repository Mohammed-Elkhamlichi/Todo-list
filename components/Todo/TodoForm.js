import axios from "axios";
import { useState } from "react";
import { useTodoContext } from "../../context/state";

const TodoForm = ({ todoInput, handleAddTodoForm }) => {
    // let apiUrl = "http://localhost:8000/api/v1/";
    // let apiUrl = "http://localhost:3000/api/v1/todos";
    let apiUrl = "https://todo-list-mem.vercel.app/api/v1/todos";

    const [todoState, todoDispatch] = useTodoContext();
    const [todoTitle, setTodoTitle] = useState("");

    const handleUpdateTodoForm = async (e) => {
        try {
            if (todoState?.isUpdateTodo) {
                e.preventDefault();

                todoDispatch({ isLoading: true });

                axios
                    .patch(
                        `${apiUrl}/${todoState?.todo._id}`,
                        {
                            completed: todoState.todo.completed,
                            title: todoTitle || todoState.todo.title,
                        },
                        { params: { apkey: "MEM_2020_NODEJS" } }
                    )
                    .then((res) => {
                        const todo = res.data.todo;
                        const todos = res.data.todos;
                        todoDispatch({
                            type: "FORM_UPDATE_TODO_SUBMIT",
                            todo,
                            todos,
                            todoAlert: { msg: "todo has been update", classes: "bg-green-500" },
                            isLoading: false,
                        });
                        setTodoTitle("");
                    })
                    .catch((err) => console.log(err));
                todoInput.current.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form
            onSubmit={(e) => {
                todoState.isUpdateTodo ? handleUpdateTodoForm(e) : handleAddTodoForm(e);
            }}
            id="todo_form"
            className="flex flex-col sm:flex-row  w-full sm:w-2/3 m-auto my-5 justify-between items-center bg">
            <div className="w-3/4 mx-1 flex flex-row items-center">
                <input
                    onChange={(e) => {
                        setTodoTitle(e.target.value);
                    }}
                    ref={todoInput}
                    type="text"
                    name="title"
                    id="title"
                    className="px-2 py-2  w-full outline-0 bod  rounded hover:outline-dotted hover:outline-slate-800"
                    placeholder="Todo"
                />
            </div>
            <div className="w-1/4 mx-1 mt-5 sm:mt-0">
                <button
                    type="submit"
                    className="py-2 bg-green-600 border-white w-full  border-2 rounded-lg hover:text-white  hover:font-bold">
                    {todoState?.isUpdateTodo && "Update"}
                    {todoState?.isAddTodo && "Add"}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
