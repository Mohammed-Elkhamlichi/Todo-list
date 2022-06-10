import { connectDB } from "../../../../models/connectDB";
import User from "../../../../models/users/User";
const registerHandler = async (req, res) => {
    const { method } = req;
    try {
        switch (method) {
            case "GET":
                console.log({ body: req.body });
                return res.status(200).json({ success: true, method });

            case "POST":
                console.log({ body: req.body });
                const email = req.body.user.email,
                    username = req.body.user.username,
                    password = req.body.user.password;

                const user = await User.create({ username, email, password });

                res.status(200).json({ success: true, method });
            default:
                res.status(501).send("<h1>Error Register New User</h1>");
        }
    } catch (error) {
        console.log(error);
    }
};
export default registerHandler;
