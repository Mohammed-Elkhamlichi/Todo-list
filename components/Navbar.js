import { MoonIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/state";

const Navbar = () => {
   const [isDarkTheme, setIsDarkTheme] = useState(true);
   const router = useRouter();
   // controle the nav bar position
   const [navFixed, setNavFixed] = useState(false);
   const [windowScrollY, setWindowScrollY] = useState();
   const [userState, userDispatch] = useUserContext();
   useEffect(() => {
      window.onscroll = () => {
         if (window.scrollY >= 200) {
            setWindowScrollY(window.scroll);
            setNavFixed(true);
         } else {
            setNavFixed(false);
         }
      };
   }, [windowScrollY]);
   const handleLogOut = () => {
      localStorage.removeItem("token");
      userDispatch({ type: "LOGOUT", jwt: null });
      router.push("/users/login");
   };
   useEffect(() => {
      if (localStorage.getItem("token") || userState.jwt !== null) {
         router.push("/");
      } else router.push("/users/login");
   }, [userState.jwt]);
   return (
      <>
         <nav
            className={`bg-slate-700 z-50 text-sky-500 flex flex-row justify-start items-center  shadow-md shadow-slate-800 ${
               navFixed ? "fixed top-0 right-0  left-0" : ""
            }`}>
            <h1 className={`flex-1 m-2   font-bold text-xl text-yellow-500`}>
               <Link href="/">
                  <a>Todo App</a>
               </Link>
            </h1>
            <ul className="flex flex-row m-2 items-center">
               {!userState.jwt ? (
                  <li className="m-2">
                     <Link href="/users/login">
                        <a className="p-2  hover:font-bold text-lg hover:animate-bounce">Log In</a>
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
               <li className="m-2 p-2 text-white cursor-pointer   ">
                  <MoonIcon
                     className={`h-10 text-lg w-14 ${isDarkTheme ? "text-yellow-500" : "text-black"}`}
                     onClick={() => {
                        setIsDarkTheme(!isDarkTheme);
                        console.log("dark/light");
                        if (isDarkTheme) {
                           console.log(true);
                        } else {
                           console.log(false);
                        }
                     }}
                  />
               </li>
            </ul>
         </nav>
         {!userState.jwt ||
            (userState.jwt === null && (
               <div className="bg-white animate-pulse w-72 rounded-lg  mx-auto my-5  px-5 py-2 or text-center flex flex-row items-center">
                  Welcome Back {userState.user.username} &#128587;
               </div>
            ))}
      </>
   );
};

export default Navbar;
