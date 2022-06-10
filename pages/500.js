import Link from "next/link";

const InternalServerError = () => {
    return (
        <>
            <div className="h-screen items-center text-center mt-10  text-white flex flex-col">
                <span className="text-4xl mt-20 mb-5 text-yellow-600 font-bold">Internal Server Error </span>
                <div className="mb-10 ">
                    <span className="text-9xl font-extrabold text-yellow-600">5</span>
                    <span className="text-9xl font-extrabold text">0</span>
                    <span className="text-9xl font-extrabold text-sky-600">0</span>
                </div>
                <Link href="/">
                    <a className="bg-yellow-600 text-xl text-black py-2 px-5 rounded  hover:border-2 hover:font-bold hover:text-white">
                        Back Home
                    </a>
                </Link>
            </div>
        </>
    );
};
export default InternalServerError;
