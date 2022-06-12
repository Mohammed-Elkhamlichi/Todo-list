import "../styles/globals.css";
import Layout from "../components/Layout";
import { TodoProvider, UserProvider } from "../context/state";
function MyApp({ Component, pageProps }) {
    return (
        <>
            <UserProvider>
                <TodoProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </TodoProvider>
            </UserProvider>
        </>
    );
}

export default MyApp;
