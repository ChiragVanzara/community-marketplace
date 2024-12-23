import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { Notification } from "../models/notification.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const buyProduct = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const productId = req.params;

    if (!productId) {
        throw new ApiError(409, "Product id is required!");
    }
    const productIdObject = new mongoose.Types.ObjectId(productId.productId);
    if (!productIdObject) {
        throw new ApiError(500, "Error while converting the ObjectId");
    }

    const product = await Product.findById(productIdObject);
    if (!product) {
        throw new ApiError(404, "Product not found!");
    }

    const seller = product.seller;

    const notification = await Notification.create({
        seller,
        buyer: userId,
        product: productIdObject,
    });
 
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                notification,
            },
            "Notification sent successfully!",
        ),
    );
});

export { buyProduct };
