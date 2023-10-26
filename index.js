import express from "express";
import { connect } from "mongoose";
const app = express();
import session from "express-session";

import userRoute from "./routes/userRoute.js";
import CustomError from "./utils/CustomError.js";

app.use(express.json());

app.use(
    session({
        secret: "x7c59#S2g^r$H9npRDf@!L$B2jkQp8",
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

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/user", userRoute);

app.all("*", (req, res, next) => {
    next(new CustomError("Page not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "ERROR NOT FOUND" } = err;
    console.log("**************ERROR*******************");
    res.status(statusCode).json({ status: false, data: { message: message } });
});
