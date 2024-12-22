import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const putProductForSell = asyncHandler(async (req, res) => {
    let images;
    if (req.files && req.files.length > 0) {
        images = req.files;
    }

    if (!images) {
        throw new ApiError(404, "Atleast one image is required!");
    }

    const productImageUrls = [];
    for (const img of images) {
        const productImagePath = img.path;
        if (!productImagePath) {
            throw new ApiError(409, "Product image is required!");
        }

        const productImageUrl = await uploadOnCloudinary(productImagePath);
        if (!productImageUrl) {
            throw new ApiError(
                500,
                "Error while uploading image on cloudinary!",
            );
        }

        productImageUrls.push(productImageUrl);
    }

    const { name, price, condition, additional } = req.body;
    if (
        [name, price, condition, additional].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new ApiError(409, "All fields are required!");
    }

    const details = {
        condition,
        additional,
    };
    const product = await Product.create({
        name,
        images: productImageUrls,
        price,
        details,
        seller: req.user?._id,
    });

    if (!product) {
        throw new ApiError(
            500,
            "Something went wrong while storing the product!",
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product is stored successfully!"));
});

const deleteImage = asyncHandler(async (req, res) => {
    const { imageUrl } = req.body;
    const result = await deleteFromCloudinary(imageUrl);
    console.log(result);
    return res
        .status(200)
        .json(new ApiResponse(200, "Image deleted successfully!"));
});

const addProductImage = asyncHandler(async (req, res) => {
    let productImagePath;
    console.log(req.file.length)
    if (req.file) {
        productImagePath = req.file?.path;
    }

    if (!productImagePath) {
        throw new ApiError(409, "Product image is required!");
    }

    const productImageUrl = await uploadOnCloudinary(productImagePath);
    if (!productImageUrl) {
        throw new ApiError(500, "Error while uploading image on cloudinary!");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, productImageUrl, "Porduct image added successfully!")
    )
});

export { putProductForSell, deleteImage, addProductImage };
