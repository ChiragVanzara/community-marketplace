import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { putProductForSell, deleteImage, addProductImage, updateProduct } from "../controllers/sell.controllers.js";

const router = Router();

router
    .route("/sell-product")
    .post(verifyJWT, upload.array("productImage", 10), putProductForSell);

router.route('/delete-image').post(verifyJWT, deleteImage);

router.route('/upload-image').post(verifyJWT, upload.single("productImage") , addProductImage);

router.route('/update-details').post(verifyJWT, updateProduct);

export default router;
