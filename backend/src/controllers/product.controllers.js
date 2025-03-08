import { Notification } from "../models/notification.models.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sellProduct = asyncHandler(async (req, res) => {
    const { name, images, price, details } = req.body;
    if ([name, price].some((field) => field === "")) {
        throw new ApiError(409, "All fields are required!");
    }

    if (!images) {
        throw new ApiError(409, "Atleast one image is required!");
    }

    const product = await Product.create({
        name,
        images,
        price,
        details,
        seller: req.user?._id,
        interestedUsers: [],
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

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    if (!id) {
        throw new ApiError(409, "Product id required!");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
    });

    if (!updatedProduct) {
        throw new ApiError(500, "Error while updating details!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedProduct,
                "Products details updated successfully!",
            ),
        );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(409, "Product id required!");
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new ApiError(
            500,
            "Errow while deleting the product from database!",
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Product deleted successfully!"));
});

const fetchProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(409, "Product id required!");
    }
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found!");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                product,
                "Product details fetched successfully!",
            ),
        );
});

const fetchAll = asyncHandler(async (_, res) => {
    const products = await Product.find({});
    if (!products) {
        throw new ApiError(404, "Product not found!");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                products,
                "Product details fetched successfully!",
            ),
        );
});

const buyProduct = asyncHandler(async(req, res) => {
    const { id } = req.params;

    if(!id) {
        throw new ApiError(409, "Product id is required!")
    }

    const product = await Product.findById(id);
    if(!product) {
        throw new ApiError(404, "Product not found!")
    }

    const order = await Order.create({
        seller: product._id,
        buyer: req.user?._id,
        product,
    })

    if(!order) {
        throw new ApiError(500, "Error while creating order!")
    }

    const notification = await Notification.create({
        
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, order, "Order created successfully!")
    )
})

export {
    sellProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    fetchAll,
    buyProduct,
};
