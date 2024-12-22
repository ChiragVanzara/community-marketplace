import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { putProductForSell } from "../controllers/sell.controllers.js";

const router = Router();

router
    .route("/sell-product")
    .post(verifyJWT, upload.array("productImage", 10), putProductForSell);

export default router;
