import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();

router.route('/register').post( upload.single("profileImage"), registerUser)

router.route('/login').post(loginUser)

export default router;
