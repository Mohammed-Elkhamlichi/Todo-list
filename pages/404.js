import Link from "next/link";

const PageNotFound = () => {
    return (
        <>
            <div>
                Page Not Found{" "}
                <Link href="/">
                    <a>Back Home</a>
                </Link>
            </div>
        </>
    );
};
export default PageNotFound;
