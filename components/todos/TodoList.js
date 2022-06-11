import { useTodoContext } from "../../../context/state";
import Todo from "./Todo";

const TodoList = ({ createTodoAlerts, completedRef, todoInput }) => {
   const [todoState, todoDispatch] = useTodoContext();

   return (
      <>
         <article d="text-white p-2">
            {todoState?.todos.map((todo) => {
               return (
                  <Todo
                     createTodoAlerts={createTodoAlerts}
                     todoInput={todoInput}
                     completedRef={completedRef}
                     key={todo._id}
                     todo={todo}
                  />
               );
            })}
         </article>
      </>
   );
};

export default TodoList;
