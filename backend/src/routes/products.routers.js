import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    buyProduct,
    fetchProduct,
    sellProduct,
    updateProduct,
    deleteProduct,
    fetchAll,
    fetchByUser,
} from "../controllers/product.controllers.js";

const router = Router();

router.route("/sell").post(verifyJWT, sellProduct);

router.route("/kiton").get(verifyJWT, fetchByUser);

router
    .route("/:id")
    .get(fetchProduct)
    .put(verifyJWT, updateProduct)
    .delete(verifyJWT, deleteProduct);

router.route("").get(fetchAll);

router.route("/buy/:id").post(verifyJWT, buyProduct);


export default router;
