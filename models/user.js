import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
import { compare, hash } from "bcrypt";
import CustomError from "../utils/CustomError.js";

const userSchema = new Schema({
    sessionId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});

userSchema.statics.findAndValidate = async function (
    sessionId,
    email,
    password,
    isForced
) {
    const foundUser = await this.findOne({ email });

    if (!foundUser) throw new CustomError("No User Found With This Email", 500);
    if (!isForced && foundUser.sessionId)
        throw new CustomError(
            "Already Logged In From 1 device.Try Forced Login",
            500
        );

    foundUser.sessionId = sessionId;
    await foundUser.save();
    const validPassword = await compare(password, foundUser.password);
    return validPassword ? foundUser : false;
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await hash(this.password, 12);
    next();
});

const User = model("User", userSchema);
export default User;
