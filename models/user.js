import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
import { compare, hash } from "bcrypt";
import CustomError from "../utils/CustomError.js";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // posts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Post",
    //     },
    // ],
});

userSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email });

    if (!foundUser) throw new CustomError("No User Found With This Email", 500);
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
