import { Router } from "express";
const router = Router();

import {
    showAllPosts,
    createPost,
    deletePost,
    editPost,
} from "../controller/postController.js";
import {
    requireLogin,
    isAuthor,
    catchAsync,
    checkId,
} from "../utils/middleware.js";
import { rateLimit } from "express-rate-limit";

//Interceptor
router.use(requireLogin);

const rateLimitOptions = {
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: {
        status: false,
        data: {
            message: "You have exceeded the limit. Please try again later.",
        },
    },
};

//using rate limit on create post
router
    .route("/")
    .get(catchAsync(showAllPosts))
    .post(rateLimit(rateLimitOptions), catchAsync(createPost));

//checkId and isAuthor middleware
router
    .route("/:id")
    .patch(checkId, catchAsync(isAuthor), editPost)
    .delete(checkId, catchAsync(isAuthor), deletePost);

export default router;
