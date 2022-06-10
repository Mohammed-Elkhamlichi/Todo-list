import { XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useTodoContext, useUserContext } from "../../context/state";
import Login from "./Login";

const LoginRegisterForms = ({ openAlert, setOpenAlert, isLogin, setIsLogin }) => {
    const [todoState, todoDispatch] = useTodoContext();
    const [userState, userDispatch] = useUserContext();
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState({
        isOpen: false,
        msg: null,
        attr: null,
    });
    // inputs
    var emailRef = useRef();
    var passwordRef = useRef();
    let apiUri = "http://localhost:8000/api/v1/users";
    // handle close/open alert
    const handleCloseOpenAlertBtn = () => {
        try {
            setOpenAlert(false);
        } catch (error) {
            console.log(error);
        }
    };

    // handle Login form
    const handleLoginForm = (e) => {
        try {
            e.preventDefault();
            if (!userState.isLogin) {
                if (isLoginForm) {
                    const password = passwordRef.current;
                    const email = emailRef.current;
                    if (password.value && email.value) {
                        console.log({
                            email: email.value,
                            password: password.value,
                        });
                        todoDispatch({
                            isLoading: true,
                        });
                        axios
                            .post(`${apiUri}/login`, {
                                email: email.value,
                                password: password.value,
                            })
                            .then(async (res) => {
                                console.log(res.data);
                                console.log(res.data.success);
                                const success = await res.data.success;
                                const jwt = await res.data.jwt;
                                if (success) {
                                    userDispatch({
                                        type: "IS_LOGIN",
                                        isLogin: true,
                                        jwt,
                                        user: {
                                            email,
                                        },
                                    });
                                    setOpenAlert(false);
                                } else {
                                    userDispatch({
                                        type: "IS_LOGIN",
                                        isLogin: false,
                                    });
                                }
                                todoDispatch({
                                    isLoading: false,
                                });
                            })
                            .catch((err) => console.log(err));

                        email.value = "";
                        password.value = "";
                    } else {
                        setIsLogin(false);
                        console.log("fields can't be blank");
                    }
                } else {
                    const password = passwordRef.current;
                    const email = emailRef.current;
                    if (password.value && email.value) {
                        console.log({
                            email: email.value,
                            password: password.value,
                        });

                        todoDispatch({
                            isLoading: true,
                        });

                        axios
                            .post(`${apiUri}/register`, {
                                email: email.value,
                                password: password.value,
                            })
                            .then(async (res) => {
                                console.log(res.data);
                                console.log(res.data.success);
                                const success = await res.data.success;
                                const jwt = await res.data.jwt;
                                if (success) {
                                    userDispatch({
                                        type: "IS_LOGIN",
                                        isLogin: true,
                                        jwt,
                                        user: {
                                            email,
                                        },
                                    });
                                    setOpenAlert(false);
                                } else {
                                    userDispatch({
                                        type: "IS_LOGIN",
                                        isLogin: false,
                                    });
                                }
                                todoDispatch({
                                    isLoading: false,
                                });
                            })
                            .catch((err) => console.log(err));

                        email.value = "";
                        password.value = "";
                    } else {
                        setIsLogin(false);
                        console.log("fields can't be blank");
                    }
                }
            } else {
                console.log("user login already");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div
                className={`bg-slate-700 w-96 m-auto mt-16 p-5  rounded fixed top-14 right-0 left-0  z-50 opacity-95 ${
                    openAlert ? "block" : "hidden"
                }`}>
                <XIcon className="h-8 w-8 absolute right-2 top-2 text-white" onClick={handleCloseOpenAlertBtn} />{" "}
                <Login
                    loginAlerts={loginAlerts}
                    setLoginAlerts={setLoginAlerts}
                    isLoginForm={isLoginForm}
                    setIsLoginForm={setIsLoginForm}
                    isLogin={isLogin}
                    emailRef={emailRef}
                    passwordRef={passwordRef}
                    handleLoginForm={handleLoginForm}
                />
            </div>
        </>
    );
};
export default LoginRegisterForms;
