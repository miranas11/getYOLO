// import CustomError from "./CustomError.js";
// import { findById } from "../models/post.js";
// import { findById as _findById } from "../models/comment.js";
import mongoose from "mongoose";
const {
    Types: { ObjectId },
} = mongoose;
// export function validatePosts(req, res, next) {
//     const result = postSchema.validate(req.body);
//     if (result.error) {
//         const msg = result.error.message;
//         throw new CustomError(msg, 404);
//     } else {
//         next();
//     }
// }

//cheks user if logged in
export function requireLogin(req, res, next) {
    if (!req.session.user_id) {
        return res.send("PLEASE LOGIN FIRST");
    }
    next();
}

// export async function isAuthor(req, res, next) {
//     const { id } = req.params;
//     const post = await findById(id);
//     console.log(post);
//     if (!post) {
//         throw new CustomError("POST NOT FOUND", 400);
//     }

//     if (!post.author.equals(req.session.user_id)) {
//         throw new CustomError(
//             "YOU DONT HAVE PERMISSION TO DELETE THIS AS YOU ARE NOT THE AUTHOR",
//             400
//         );
//     }
//     next();
// }

// export async function isCommentAuthor(req, res, next) {
//     const { commentId } = req.params;
//     const comment = await _findById(commentId);
//     if (!comment.author.equals(req.session.user_id))
//         return res.send("YOU DON'T HAVE PERMISSION TO DO THIS");

//     next();
// }

export function catchAsync(func) {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
}

const validateObjectId = (id) =>
    ObjectId.isValid(id) && new ObjectId(id).toString() === id;

// export function checkId(req, res, next) {
//     const { commentId, id } = req.params;

//     if (!validateObjectId(id)) {
//         throw new CustomError("OBJECT ID NOT VALID", 400);
//     }
//     if (commentId && !validateObjectId(commentId)) {
//         throw new CustomError("COMMENT ID NOT VALID", 400);
//     }
//     next();
// }
