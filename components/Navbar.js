import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/state";

const Navbar = () => {
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
            <ul className="flex flex-row m-2">
               <li className="m-2">
                  <Link href="/users/login">
                     <a className="p-2  hover:font-bold text-lg hover:animate-bounce">Log In</a>
                  </Link>
               </li>

               {/* <li className="m-2">
                        <Link href="/users/login">
                            <a className="p-2  hover:font-bold text-lg hover:animate-bounce">Log Out</a>
                        </Link>
                    </li> */}
            </ul>
         </nav>
      </>
   );
};

export default Navbar;
