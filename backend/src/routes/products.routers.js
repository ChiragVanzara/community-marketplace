import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    putProductForSell,
    deleteImage,
    addProductImage,
    updateProduct,
    deleteProduct,
    buyProduct,
} from "../controllers/products.controllers.js";

const router = Router();

router
    .route("/sell")
    .post(verifyJWT, upload.array("productImage", 10), putProductForSell);

router.route("/delete-image/:imageUrl").post(verifyJWT, deleteImage);

router
    .route("/upload-image")
    .post(verifyJWT, upload.single("productImage"), addProductImage);

router.route("/update-details").post(verifyJWT, updateProduct);

router.route("/delete/:productId").post(verifyJWT, deleteProduct);

router.route("/buy/:productId").post(verifyJWT, buyProduct);

export default router;
