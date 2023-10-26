import { Router } from "express";
const router = Router();
import {
    createUser,
    validateUser,
    showUserById,
    logout,
} from "../controller/userController.js";
import { catchAsync } from "../utils/middleware.js";

router.route("/register").post(createUser);

router.route("/login").post(validateUser);

router.route("/logout").get(logout);

router.route("/search/:id").get(catchAsync(showUserById));

export default router;
