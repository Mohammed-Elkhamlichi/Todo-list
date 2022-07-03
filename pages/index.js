import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTodoContext, useUserContext } from "../context/state";
import TodoForm from "../todos/components/TodoForm";
import TodoList from "../todos/components/TodoList";
import Alert from "../components/Alert";
import { validJWT } from "../utils/validJWT";
import apiUrlManager from "../utils/apiUrlManager";

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
      // let message = msg;

      todoDispatch({
         todoAlert: { msg: message, classes },
      });
      setTimeout(() => todoDispatch({ todoAlert: { msg: null, classes: null } }), 10000);
   };
   // get all Todos Function
   const getAllTodos = () => {
      try {

         const token = localStorage.getItem("token");
         if (token && token.length > 20) {
            axios
               .get(apiUrlManager('todos/'), { headers: { Authorization: `Todo ${token}` } })
               .then((res) => {
                  const data = res.data;
                  todoDispatch({ type: "GET_TODOS", todos: data.todos });
                  userDispatch({ type: "SET_JWT", jwt: token });
               })
               .catch((err) => console.log(err));
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
         validJWT(router);
         userDispatch({ type: "SET_JWT", jwt: localStorage.getItem("token") });
         if (todoState?.isAddTodo) {
            let todotitle = todoInput.current;
            if (todotitle.value) {
               const token = localStorage.getItem("token");
               if (token && token.length > 20) {
                  axios
                     .post(
                        apiUrlManager('todos/'),
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
                           });
                           userDispatch({ type: "SET_JWT", jwt: token });
                        } else {
                           todoDispatch({
                              todoAlert: {
                                 msg: "todo already exist",
                                 classes: "bg-red-500",
                              },
                           });
                        }
                     })
                     .catch((err) => console.log(err));
                  todotitle.value = "";
               } else {
                  router.push("/users/login");
               }
            } else {
               todoDispatch({
                  todoAlert: { msg: "Ooops! Title is required", classes: "bg-red-500" },
               });
            }
         } else {
            router.push("/users/login");
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

   useEffect(() => {
      validJWT(router);
   }, []);

   return (
      <div className="">
         <main className="">
            <section className="bg-slate-700 w-11/12 sm:w-3/3 md:w-2/3 rounded m-auto mt-10 py-10">
               <h1 className="text-5xl font-bold  pt-5 text-center text-white">Todo APP</h1>
               {todoState.todoAlert.msg && (
                  <Alert classes={todoState?.todoAlert.classes} msg={todoState?.todoAlert.msg} />
               )}
               {/* TODO FORM */}
               <TodoForm
                  createTodoAlerts={createTodoAlerts}
                  todoInput={todoInput}
                  handleAddTodoForm={handleAddTodoForm}
               />
            </section>

            <section className="bg-slate-700 w-11/12 sm:w-3/3 md:w-2/3 rounded m-auto mt-5 mb-20 py-10">
               <h1 className="text-5xl font-bold  pt-5 text-center text-white">Todo List</h1>
               {todoState.todos.length && !todoState.isLoading ? (
                  <TodoList createTodoAlerts={createTodoAlerts} todoInput={todoInput} completedRef={completedRef} />
               ) : (
                  <h1 className="bg-sky-500 px-2 py-2 w-10/12 m-auto rounded mt-5 font-mono text-justify text-base">
                     Add your to do List , Start the work and Achieve your Dreams
                  </h1>
               )}
            </section>
         </main>
      </div>
   );
}
