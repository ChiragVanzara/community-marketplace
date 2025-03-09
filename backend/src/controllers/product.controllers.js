import mongoose from "mongoose";
import { Notification } from "../models/notification.models.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sellProduct = asyncHandler(async (req, res) => {
    // console.log('come in seller')
    const { name, images, price, category, details } = req.body;
    const userId = req.user?._id;

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
        category,
        seller: req.user?._id,
        interestedUsers: [],

    });

    if (!product) {
        throw new ApiError(
            500,
            "Something went wrong while storing the product!",
        );
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $push: { prodcutsForSell: product._id },
            $inc: { noOfProductsToSell: 1 },
        },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product is stored successfully!"));
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;
    // console.log(product)

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
    // console.log(id)
    // console.log('mc')
    const userId = new mongoose.Types.ObjectId(id)
    const product = await Product.findById(userId);
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

const fetchByUser = asyncHandler(async (req, res) => {
    // console.log("kiton: ", req.user?._id)
    const id = req.user?._id;

    const products = await Product.find({seller: id})
    // console.log(products)
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
    console.log(id)

    if(!id) {
        throw new ApiError(409, "Product id is required!")
    }

    const product = await Product.findById(id);
    console.log(product)
    if(!product) {
        throw new ApiError(404, "Product not found!")
    }

    const order = await Order.create({
        seller: product?.seller,
        buyer: req.user?._id,
        product,
    })

    console.log(order)
    if(!order) {
        throw new ApiError(500, "Error while creating order!")
    }

    const notification = await Notification.create({
        user: req?.user?._id,
        recipient: product?.seller,
        type: 'order',
        product,
    });

    console.log(notification)

    if(!notification) {
        throw new ApiError(500, "Error while generating order!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, { order, notification }, "Order created successfully!")
    )
})

export {
    sellProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    fetchAll,
    buyProduct,
    fetchByUser,
};
