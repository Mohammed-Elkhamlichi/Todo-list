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
            return { ...state };
        case "SET_COOKIES_JWT":
            return {
                ...state,
            };
        case "IS_TOKEN":
            return { ...state };
        default:
            return { ...state };
    }
};
