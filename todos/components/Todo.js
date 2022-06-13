import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTodoContext } from "../../context/state";

const Todo = ({ todo, completedRef, createTodoAlerts, todoInput }) => {
   const router = useRouter();
   // context api with reducer
   const [todoState, todoDispatch] = useTodoContext();
   // the checkbox state ( todo completed or not)
   const [isCompletedTodo, setIsCompletedTodo] = useState(true);

   // let apiUrl = "http://localhost:3000/api/v1/todos";
   let apiUrl = "https://todo-list-mem.vercel.app/api/v1/todos";
   let { _id, title, completed } = todo;

   // Delete Todo Function
   const handledDeleteTodoBtn = (id) => {
      try {
         const token = localStorage.getItem("token");
         if (token && token.length > 20) {
            axios
               .delete(`${apiUrl}/${id}`, { headers: { Authorization: `Todo ${token}` } })
               .then((res) => {
                  todoDispatch({
                     type: "DELETE_TODO",
                     todos: res.data.todos,

                     todoAlert: { msg: "todo deleted", classes: "bg-green-500" },
                  });
               })
               .catch((err) => console.log(err));
            createTodoAlerts(todoState?.todoAlert.msg, todoState?.todoAlert.classes);
         } else {
            router.push("/users/login");
         }
      } catch (error) {
         console.log(error);
      }
   };

   // when the Check box state change
   const handleCheckBox = (e) => {
      try {
         const token = localStorage.getItem("token");
         if (token && token.length > 20) {
            axios
               .patch(
                  `${apiUrl}/${_id}`,
                  {
                     _id,
                     completed: isCompletedTodo,
                  },
                  { headers: { Authorization: `Todo ${token}` } }
               )
               .then((res) => {
                  const todos = res.data.todos;
                  todoDispatch({
                     type: "PATCH_TODO_IS_COMPLETED",
                     todos,
                     todoAlert: {
                        msg: `${isCompletedTodo ? "todo completed" : "todo not completed"}`,
                        classes: "bg-green-500",
                     },
                  });
               })
               .catch((err) => console.log(err));
         } else {
            router.push("/users/login");
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Update Todo Function
   const handleUpdateTodoBtn = (todo) => {
      try {
         window.scrollTo({ top: 0, behavior: "auto" });
         todoInput.current.value = todo.title;
         todoDispatch({ type: "BTN_UPDATE_TODO_CLICKED", todo });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div
         className={`bg-slate-600 p-2 my-2 flex flex-row justify-between items-center border-solid rounded-tl-lg rounded-bl-lg ${
            completed ? "border-l-8 border-yellow-400" : "border-l-8 border-slate-500"
         }`}
         key={_id}>
         <div>
            <input
               onChange={(e) => {
                  setIsCompletedTodo(!isCompletedTodo);
                  handleCheckBox(e);
               }}
               type="checkbox"
               name="completed"
               id="completed"
               className={`h-8 w-6 accent-yellow-400`}
               ref={completedRef}
               checked={completed}
            />
         </div>
         <div className=" text-sm px-3 text-justify">
            {completed ? (
               <h1>
                  <i>
                     <del>{title}</del>
                  </i>
               </h1>
            ) : (
               <h1>{title}</h1>
            )}
         </div>
         <div className="flex flex-row ">
            <div className="h-7 w-7 text-sm text-yellow-400 mx-2 hover:animate-pulse cursor-pointer">
               <TrashIcon onClick={() => handledDeleteTodoBtn(_id)} />
            </div>
            <div className="h-7 w-7 text-sm mx-2 hover:animate-pulse cursor-pointer">
               <PencilAltIcon onClick={() => handleUpdateTodoBtn(todo)} />
            </div>
         </div>
      </div>
   );
};

export default Todo;
