import { Router } from "express";
const router = Router();
import {
    createUser,
    validateUser,
    logout,
} from "../controller/userController.js";

router.route("/register").post(createUser);

router.route("/login").post(validateUser);

router.route("/logout").get(logout);

export default router;
