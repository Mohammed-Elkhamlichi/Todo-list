import Link from "next/link";
import { useRouter } from "next/router";
import { useTodoContext, useUserContext } from "../context/state";

const Navbar = () => {
    const router = useRouter();
    // controle the nav bar position
    const [userState, userDispatch] = useUserContext();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        userDispatch({ type: "LOGOUT", jwt: null });
        router.push("/users/login");
    };

    return (
        <>
            <nav
                className={`bg-slate-700 text-sky-500 flex flex-row justify-start items-center  shadow-md shadow-slate-800`}>
                <h1 className={`flex-1 m-2   font-bold text-xl text-yellow-500`}>
                    <Link href="/">
                        <a>Todo App</a>
                    </Link>
                </h1>
                <ul className="flex flex-row m-2 items-center">
                    {!userState.jwt && !localStorage.getItem("token")?.length ? (
                        <li className="m-2">
                            <Link href="/users/login">
                                <a className="p-2  hover:font-bold text-lg hover:animate-bounce">
                                    Log In
                                </a>
                            </Link>
                        </li>
                    ) : (
                        <li className="m-2">
                            <Link href="/users/login">
                                <a
                                    className="p-2  hover:font-bold text-lg hover:animate-bounce"
                                    onClick={() => {
                                        handleLogOut();
                                    }}>
                                    Log Out
                                </a>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
