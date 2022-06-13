export const todoInitialState = {
   // create update delete todo alerts
   todoAlert: { msg: null, classes: null },
   todos: [],
   todo: {},
   // when create new todo
   isAddTodo: true,
   isUpdateTodo: false,
   isLoading: true,
};

export const todoReducer = (state, action) => {
   let todoAlert = action.todoAlert || state.todoAlert;
   let todo = action.todo || state.todo;
   let todos = action.todos || state.todos;
   switch (action.type) {
      // get all todos
      case "GET_TODOS":
         return {
            ...state,
            todos,
            todo,
            todoAlert,
         };
      // create new todo
      case "CERATE_NEW_TODO":
         return {
            ...state,
            todos,
            isUpdateTodo: false,
            isAddTodo: true,
            todoAlert,
         };
      // when the user click on btn edit todo
      case "BTN_UPDATE_TODO_CLICKED":
         return {
            ...state,
            todo,
            isUpdateTodo: true,
            isAddTodo: false,
            todoAlert,
         };
      // update an existing todo
      case "FORM_UPDATE_TODO_SUBMIT":
         return {
            ...state,
            todo,
            todos,
            isUpdateTodo: false,
            isAddTodo: true,
            todoAlert,
         };
      // update the state of an existing todo
      case "PATCH_TODO_IS_COMPLETED":
         return {
            ...state,
            todos,
            todoAlert,
         };
      // deleting todo
      case "DELETE_TODO":
         return {
            ...state,
            todos,
            todoAlert,
         };
      case "SET_LOADING_STATE":
         const isLoading = action.isLoading;
         return { ...state, isLoading };
      // defalut reducer

      default:
         return {
            ...state,
            todoAlert,
         };
   }
};
