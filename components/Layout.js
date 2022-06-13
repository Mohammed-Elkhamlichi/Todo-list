import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";
import { useTodoContext } from "../context/state";
import { useEffect } from "react";

const Layout = ({ children }) => {
   const [todoState, todoDispatch] = useTodoContext();

   useEffect(() => {
      // todoDispatch({ type: "SET_LOADING_STATE", isLoading: true });
      setTimeout(() => {
         todoDispatch({ type: "SET_LOADING_STATE", isLoading: false });
      }, 2000);
   }, []);

   return (
      <>
         <Head>
            <title>Todo App</title>
            <meta name="description" content="Todo app using nextJS, react.js, axios, tailwind CSS" />
            <link rel="author" href="https://www.linkedin.com/in/mohammed-el-khamlichi-2608011b5" />
            <meta name="copyright" content="Mohammed EL Khamlichi" />
            <meta name="autho" content="Mohammed EL Khamlichi" />
            <meta name="keywords" content="todo,list,goals,trucker,habits" />

            <link rel="icon" href="/favicon.ico" />
         </Head>
         {!todoState.isLoading ? (
            <>
               <header>
                  <Navbar />
               </header>
               <main>{children}</main>
               <Footer />
            </>
         ) : (
            <div className="flex items-center justify-center space-x-2 animate-bounce mt-96">
               <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
               <div className="w-8 h-8 bg-green-400 rounded-full"></div>
               <div className="w-8 h-8 bg-black rounded-full"></div>
            </div>
         )}
      </>
   );
};

export default Layout;
