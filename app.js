// Requirements
const express = require("express");
const app = express();
const { TodoRouter } = require("./routers/todoRoutes");
const { UserRouter } = require("./routers/userRoutes");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./models/connectDB");
const cors = require("cors");

// Environment variables
const { PORT } = require("./config");

// midlewares and static files
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", TodoRouter);
app.use("/api/v1/users", UserRouter);

// Server
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server listen on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
