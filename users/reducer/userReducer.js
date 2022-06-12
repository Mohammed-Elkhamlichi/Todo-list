export const userInitialState = {
   users: [],
   user: {},
   isLogin: false,
   isCookies: false,
   jwt: null,
   isOpenAuthWindow: false,
   userAlert: { msg: null, classes: null },
};

export const userReducer = (state, action) => {
   const users = action.users || state.users;
   const user = action.user || state.user;
   let userAlert = action.userAlert || state.userAlert;

   switch (action.type) {
      case "LOGIN":
         return { ...state, userAlert };
      case "REGISTER":
         return { ...state, users, user, userAlert };
      default:
         return { ...state };
   }
};
