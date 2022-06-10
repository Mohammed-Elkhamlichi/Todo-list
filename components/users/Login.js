import { useState } from "react";
import { useUserContext } from "../../context/state";

const Login = ({
    isLoginForm,
    setIsLoginForm,
    passwordRef,
    emailRef,
    handleLoginForm,
    loginAlerts,
    setLoginAlerts,
}) => {
    const [userState, userDispatch] = useUserContext();
    return (
        <>
            <form action="flex flex-col" onSubmit={handleLoginForm}>
                <div className="flex flex-row items-center justify-center  mt-5">
                    <h1
                        className={`mx-3 ${
                            isLoginForm && "bg-green-700"
                        } text-white font-bold border-2 border-white py-1 px-3 rounded hover:animate-bounce`}
                        onClick={() => setIsLoginForm(true)}>
                        Sign In
                    </h1>
                    <h1
                        className={`mx-3 ${
                            !isLoginForm && "bg-green-700"
                        } text-white font-bold border-2 border-white py-1 px-3 rounded hover:animate-bounce `}
                        onClick={() => setIsLoginForm(false)}>
                        Sign Up
                    </h1>
                </div>

                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="m-1">
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="py-2 px-2 outline-0 rounded w-full"
                            placeholder="email"
                        />
                    </div>
                    <div className="m-1">
                        <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            className="py-2 px-2 outline-0 rounded w-full"
                            placeholder="password"
                        />
                    </div>
                    <div className="m-1">
                        <input
                            type="submit"
                            name=""
                            id=""
                            value={isLoginForm ? "Sign In" : "Sign Up"}
                            className="bg-white py-2 px-5 rounded border-4 mt-3"
                        />
                    </div>
                </div>
                <div className="text-white font-semibold mt-10 text-center ">
                    <i>
                        to add a new todo or delete,update one you should Sign
                        in into your account or create a new account
                    </i>
                </div>
            </form>
        </>
    );
};

export default Login;
