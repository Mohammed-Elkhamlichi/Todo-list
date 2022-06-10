import Link from "next/link";

const Login = () => {
    const handleLoginForm = (e) => {
        e.preventDefault();
        console.log("login form handler");
    };
    return (
        <>
            <section className="">
                <form
                    action=""
                    className="bg-slate-700 flex flex-col items-center mt-20 w-11/12 m-auto rounded sm:w-3/4 md:w-2/4"
                    onSubmit={(e) => {
                        handleLoginForm(e);
                    }}>
                    <h1 className="text-4xl sm:text-5xl text-white font-bold my-10">Login Form</h1>
                    <div className="flex flex-col items-center my-5 w-10/12 sm:w-3/4 lg:w-2/4">
                        <div className="my-2 m-auto w-full">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                autoCorrect="true"
                                className="py-2 px-3 text-lg rounded outline-yellow-600 outline-4 placeholder:text-yellow-600 placeholder:opacity-80 w-full"
                            />
                        </div>
                        <div className="my-2 m-auto w-full">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoCorrect="true"
                                className="py-2 px-3 text-lg rounded outline-yellow-600 outline-4 placeholder:text-yellow-600  placeholder:opacity-80  w-full"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-yellow-500 my-4 py-2 px-5 rounded hover:text-white hover:shadow-lg shadow-slate-600">
                                Login
                            </button>
                        </div>
                        <div className="my-3">
                            <Link href="/users/register">
                                <a className="text-sm font-mono text-white">
                                    Don't have an account?{" "}
                                    <span className="bg-yellow-600 py-1  px-3 rounded ">Sign Up</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};
export default Login;
