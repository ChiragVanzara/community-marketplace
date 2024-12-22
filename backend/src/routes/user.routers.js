import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser,
    updateUserDetails,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-password").post(verifyJWT, changePassword);

router.route("/get-current-user").post(verifyJWT, getCurrentUser);

router.route("/update-details").post(verifyJWT, updateUserDetails);

export default router;
