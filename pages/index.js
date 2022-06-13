import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
// context API
import { useTodoContext, useUserContext } from "../context/state";
// components
import TodoForm from "../todos/components/TodoForm";
import TodoList from "../todos/components/TodoList";
import Alert from "../components/Alert";

const { setCookies, getCookies, removeCookies, getCookie, checkCookies } = require("cookies-next");

// let apiUrl = "http://localhost:3000/api/v1/todos";
let apiUrl = "https://todo-list-mem.vercel.app/api/v1/todos";

export default function Home() {
   const router = useRouter();
   // todo Context
   const [todoState, todoDispatch] = useTodoContext();
   const [userState, userDispatch] = useUserContext();

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
         const token = localStorage.getItem("token");
         if (token) {
            axios
               .get(apiUrl, { headers: { Authorization: `Todo ${token}` } })
               .then((res) => {
                  const data = res.data;
                  todoDispatch({ type: "GET_TODOS", todos: data.todos });
                  userDispatch({ type: "SET_JWT", jwt: token });
               })
               .catch((err) => console.log(err));
            setTimeout(() => {
               todoDispatch({ isLoading: false });
            }, 2000);
         } else {
            router.push("/users/login");
         }
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
               const token = localStorage.getItem("token");
               axios
                  .post(
                     apiUrl,
                     {
                        title: todotitle.value,
                     },
                     { headers: { Authorization: `Todo ${token}` } }
                  )
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
      createTodoAlerts(todoState?.todoAlert.msg, todoState?.todoAlert.classes);
   }, [todoState?.todoAlert.msg]);

   useEffect(() => {
      getAllTodos();
   }, []);
   return (
      <div className="">
         <main className={`${todoState?.isLoading ? "z-0 opacity-60" : "z-10 opacity-100 "}  }`}>
            {/* TODO FORM */}
            <section className="bg-slate-700 w-11/12 sm:w-3/3 md:w-2/3 rounded m-auto mt-10 py-10">
               {todoState?.isLoading && (
                  <div className="text-center  w-60 m-auto items-center">
                     <div className="animate-spin border-8 border-white w-10 h-10 rounded-full border-dashed  m-auto  border-l-slate-800 border-t-green-100 border-r-blue-800 border-b-sky-400"></div>
                  </div>
               )}
               <h1 className="text-5xl font-bold  pt-5 text-center text-white">Todo APP</h1>

               <Alert classes={todoState.todoAlert.classes} msg={todoState?.todoAlert.msg} />

               {/* TODO FORM */}
               <TodoForm
                  createTodoAlerts={createTodoAlerts}
                  todoInput={todoInput}
                  handleAddTodoForm={handleAddTodoForm}
               />
            </section>

            <section className="bg-slate-700 w-11/12 sm:w-3/3 md:w-2/3 rounded m-auto mt-5 mb-20 py-10">
               <h1 className="text-5xl font-bold  pt-5 text-center text-white">Todo List</h1>

               {!todoState.todos || !todoState.todo ? (
                  <h1 className="bg-sky-500 px-2 py-2 w-10/12 m-auto rounded mt-5 font-mono text-justify text-base">
                     Add Your First Todo and Start the work and get your dreams
                  </h1>
               ) : (
                  <TodoList createTodoAlerts={createTodoAlerts} todoInput={todoInput} completedRef={completedRef} />
               )}
            </section>
         </main>
      </div>
   );
}
