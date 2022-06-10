import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Todo App</title>
                <meta name="description" content="Todo app using nextJS, react.js, axios, tailwind CSS" />
                {/* <link rel="author" href="https://www.linkedin.com/in/mohammed-el-khamlichi-2608011b5" /> */}
                <meta name="copyright" content="Mohammed EL Khamlichi" />
                <meta name="autho" content="Mohammed EL Khamlichi" />
                <meta name="keywords" content="todo,list,goals,trucker,habits" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Navbar />
            </header>

            <main>{children}</main>

            <Footer />
        </>
    );
};

export default Layout;
