import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { buyProduct } from "../controllers/buy.controllers.js";

const router = Router();

router.route('/buy-product/:productId').post(verifyJWT, buyProduct);

export default router;