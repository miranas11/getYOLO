import express from "express";
import { connect } from "mongoose";
const app = express();
import session from "express-session";
import { session_key } from "./config.js";

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

import CustomError from "./utils/CustomError.js";

app.use(express.json());

app.use(
    session({
        secret: session_key,
        resave: false,
        saveUninitialized: true,
    })
);

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});

connect("mongodb://127.0.0.1:27017/Assignment")
    .then(() => {
        console.log("Connection Open");
    })
    .catch((e) => {
        console.log("ERROR");
    });

app.use("/user", userRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
    res.json({ status: true, data: { message: "Server Running" } });
});

app.all("*", (req, res, next) => {
    next(new CustomError("Page not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "ERROR NOT FOUND" } = err;
    console.log("**************ERROR*******************");
    res.status(statusCode).json({ status: false, data: { message: message } });
});
