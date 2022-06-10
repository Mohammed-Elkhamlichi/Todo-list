export const todoInitialState = {
    // create update delete todo alerts
    todoAlert: { msg: null, classes: null },
    todos: [],
    todo: {},
    // when create new todo
    isAddTodo: true,
    isUpdateTodo: false,
    isLoading: false,
};

export const todoReducer = (state, action) => {
    let isLoading = action.isLoading ? action.isLoading : false;
    let todoAlert = action.todoAlert ? action.todoAlert : state.todoAlert;
    let todo = action.todo ? action.todo : state.todo;
    let todos = action.todos ? action.todos : state.todos;
    console.log({ isLoading, todoAlert, todo, todos });
    switch (action.type) {
        // get all todos
        case "GET_TODOS":
            return {
                ...state,
                isLoading,
                todos,
                todo,
                todoAlert,
            };
        // create new todo
        case "CERATE_NEW_TODO":
            console.log({ create: isLoading });
            console.log("CERATE_NEW_TODO");
            console.log({ create_todo_state: { state, action } });
            return {
                ...state,
                todos,
                isUpdateTodo: false,
                isAddTodo: true,
                todoAlert,
                isLoading,
            };
        // when the user click on btn edit todo

        case "BTN_UPDATE_TODO_CLICKED":
            console.log({ btn_update: isLoading });
            console.log("BTN_UPDATE_TODO_CLICKED");

            return {
                ...state,
                todo,
                isUpdateTodo: true,
                isAddTodo: false,
                todoAlert,
                isLoading,
            };

        // update an existing todo
        case "FORM_UPDATE_TODO_SUBMIT":
            console.log({ update: isLoading });
            console.log("FORM_UPDATE_TODO_SUBMIT");
            return {
                ...state,
                todo,
                todos,
                isUpdateTodo: false,
                isAddTodo: true,
                isLoading,
                todoAlert,
            };

        // update the state of an existing todo
        case "PATCH_TODO_IS_COMPLETED":
            console.log({ update_compl: isLoading });
            console.log("PATCH_TODO_IS_COMPLETED");
            return {
                ...state,
                todos,
                isLoading,
                todoAlert,
            };

        // deleting todo
        case "DELETE_TODO":
            console.log({ delete: isLoading });
            console.log("DELETE_TODO");
            return {
                ...state,
                todos,
                isLoading,
                todoAlert,
            };

        // defalut reducer
        default:
            console.log({ default: isLoading });
            return {
                ...state,
                isLoading,
                todoAlert,
            };
    }
};
