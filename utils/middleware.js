import CustomError from "./CustomError.js";
import Posts from "../models/posts.js";

import mongoose from "mongoose";
const {
    Types: { ObjectId },
} = mongoose;

export function requireLogin(req, res, next) {
    if (!req.session.user_id) {
        throw new CustomError("User Not Logged In", 401);
    }
    next();
}

export async function isAuthor(req, res, next) {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
        throw new CustomError("No Post Found", 404);
    }

    if (!post.author.equals(req.session.user_id)) {
        throw new CustomError(
            "Your Dont Have Permission to Delete This Post As You Are Not The Author",
            404
        );
    }
    next();
}

export function catchAsync(func) {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
}

const validateObjectId = (id) =>
    ObjectId.isValid(id) && new ObjectId(id).toString() === id;

export function checkId(req, res, next) {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        throw new CustomError("OBJECT ID NOT VALID", 400);
    }

    next();
}
