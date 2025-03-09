import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser,
    updateUserDetails,
    updateProfileImage,
    getUserById,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-password").post(verifyJWT, changePassword);

router.route("/get-current-user").post(verifyJWT, getCurrentUser);

router.route("/update-details").post(verifyJWT, updateUserDetails);

router
    .route("/update-profile-image")
    .post(verifyJWT,updateProfileImage);

router.route('/:id').get(getUserById);


export default router;
