const login = (req, res) => {
    try {
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(501).json({ success: true });
    }
};
export default login;
