import { createContext, useContext, useReducer } from "react";
import { todoInitialState, todoReducer } from "./todos/todoReducer";
import { userInitialState, userReducer } from "./users/userReducer";

// Tood Context api with useReducer Hook
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);
    return <TodoContext.Provider value={[todoState, todoDispatch]}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
    return useContext(TodoContext);
};

// User Context api with useReducer Hook
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);
    return <UserContext.Provider value={[userState, userDispatch]}>{children}</UserContext.Provider>;
};
export const useUserContext = () => {
    return useContext(UserContext);
};
