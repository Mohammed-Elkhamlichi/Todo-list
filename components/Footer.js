const Footer = () => {
    const thisYear = new Date().getFullYear();
    return (
        <footer className="bg-slate-700 z-50 text-sky-500 py-3 text-center items-center fixed bottom-0 right-0 left-0">
            <h1 className="text-sm">
                TodoList
                <span className="font-bold">
                    &copy;
                    {thisYear}
                </span>{" "}
                By Mohammed-EL-Khamlichi
            </h1>
        </footer>
    );
};

export default Footer;
