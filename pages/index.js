import axios from "axios";
import { useEffect, useRef, useState } from "react";
// context API
import { useTodoContext, useUserContext } from "../context/state";
// components
import TodoForm from "../components/Todo/TodoForm";
import LoginRegisterForms from "../components/User/LorginRegisterForms";
import TodoList from "../components/Todo/TodoList";

export default function Home() {
    // let apiUrl = "http://localhost:8000/api/v1/";
    let apiUrl = "http://localhost:3000/api/v1/todos";

    // states
    const [isOpenAuthWindow, setIsOpenAuthWindow] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    // todo Context
    const [todoState, todoDispatch] = useTodoContext();
    const [userState, userDispatch] = useTodoContext();

    // get the todo title input
    const todoInput = useRef(null);
    const completedRef = useRef(null);

    // alert method with timer for error & success msg
    const createTodoAlerts = (msg, classes) => {
        let message = msg?.toString().toUpperCase();
        todoDispatch({
            todoAlert: { msg: message, classes },
        });
        setTimeout(
            () =>
                todoDispatch({
                    todoAlert: { msg: "", classes: "" },
                }),
            5000
        );
    };
    // get all Todos Function
    const getAllTodos = () => {
        try {
            todoDispatch({ isLoading: true });
            axios
                .get(apiUrl)
                .then((res) => {
                    todoDispatch({ type: "GET_TODOS", todos: res.data.todos, isLoading: false });
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    };

    // Add Todo Function
    const createTodo = () => {
        try {
            if (todoState?.isAddTodo) {
                let todotitle = todoInput.current;
                if (todotitle.value) {
                    todoDispatch({ isLoading: true });
                    axios
                        .post(apiUrl, {
                            title: todotitle.value,
                        })
                        .then((res) => {
                            if (res.data.success) {
                                todoDispatch({
                                    type: "CERATE_NEW_TODO",
                                    todos: res.data.todos,
                                    todoAlert: {
                                        msg: "success create todo",
                                        classes: "bg-green-500",
                                    },
                                    isLoading: false,
                                });
                            } else {
                                todoDispatch({
                                    todoAlert: {
                                        msg: "todo already exist",
                                        classes: "bg-red-500",
                                    },
                                    isLoading: false,
                                });
                            }
                        })
                        .catch((err) => console.log(err));
                    todotitle.value = "";
                    todoDispatch({ isLoading: false });
                } else {
                    todoDispatch({
                        todoAlert: { msg: "Ooops! Title is required", classes: "bg-red-500" },
                        isLoading: false,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Form Handler Function
    const handleAddTodoForm = (e) => {
        e.preventDefault();
        createTodo();
    };

    // re-rendre and refresh the data
    useEffect(() => {
        userDispatch({ isOpenAuthWindow: false });
        getAllTodos();
    }, []);

    useEffect(() => {
        createTodoAlerts(todoState?.todoAlert.msg, todoState?.todoAlert.classes);
    }, [todoState?.todoAlert.msg]);

    return (
        <div className="">
            <main
                className={`${
                    userState?.isOpenAuthWindow || todoState?.isLoading ? "z-0 opacity-60" : "z-10 opacity-100"
                }  }`}>
                {/* TODO FORM */}
                <section className="bg-slate-700 w-11/12 sm:w-3/3 md:w-2/3 rounded m-auto mt-5 py-10">
                    {todoState?.isLoading && (
                        <div className="text-center  w-60 m-auto items-center">
                            <div className="animate-spin border-8 border-white w-10 h-10 rounded-full border-dashed  m-auto  border-l-slate-800 border-t-green-100 border-r-blue-800 border-b-sky-400"></div>
                        </div>
                    )}
                    <h1 className="text-5xl font-bold  pt-5 text-center text-white">Todo APP</h1>
                    <div
                        className={`text-center rounded-full opacity-90 text-white ${todoState.todoAlert.classes} w-1/2 m-auto mt-4 px-2 py-2`}>
                        {todoState.todoAlert.msg}
                    </div>

                    {/* TODO FORM */}
                    <TodoForm
                        createTodoAlerts={createTodoAlerts}
                        todoInput={todoInput}
                        handleAddTodoForm={handleAddTodoForm}
                    />
                </section>

                <section className="bg-slate-700 w-11/12 sm:w-3/3 md:w-2/3 rounded m-auto my-5 py-10">
                    <h1 className="text-5xl font-bold  pt-5 text-center text-white">Todo List</h1>
                    {/* TODO LIST */}
                    <TodoList todoInput={todoInput} completedRef={completedRef} />
                </section>
            </main>

            {/* ALERT */}
            <LoginRegisterForms isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
    );
}
