export const userInitialState = {
    users: [],
    user: null,
    isLogin: false,
    isCookies: false,
    jwt: null,
    isOpenAuthWindow: false,
};

export const userReducer = async (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state };
        case "REGISTER":
            return { ...state };
        case "IS_LOGIN":
            const email = await action.email;
            const jwt = await action.jwt;
            localStorage.setItem("access_token", jwt);
            return { ...state, isLogin: action.isLogin, jwt, user: email };
        case "SET_COOKIES_JWT":
            return {
                ...state,
                jwt: action.jwt,
                users: action.users,
                user: action.user,
            };
        case "IS_TOKEN":
            return { ...state };
        default:
            const isOpenAuthWindow = action.isOpenAuthWindow || false;
            return { ...state, isOpenAuthWindow };
    }
};
