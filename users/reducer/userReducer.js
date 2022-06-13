const { getCookie } = require("cookies-next");

export const userInitialState = {
   users: [],
   user: {},
   isLogin: false,
   isCookies: false,
   jwt: null,
   userAlert: { msg: null, classes: null },
};

export const userReducer = (state, action) => {
   const users = action.users || state.users;
   const user = action.user || state.user;
   const jwt = action.jwt || localStorage.getItem("token");
   let userAlert = action.userAlert || state.userAlert;
   switch (action.type) {
      case "LOGIN":
         return { ...state, userAlert, user, jwt };
      case "REGISTER":
         return { ...state, users, user, userAlert, jwt };
      case "LOGOUT":
         return { ...state, users, user, userAlert, jwt };
      case "SET_JWT":
         return { ...state, jwt };
      default:
         return { ...state };
   }
};
