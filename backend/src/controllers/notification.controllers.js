import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { Notification } from "../models/notification.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendBuyNotification = asyncHandler(async (req, res) => {});

const fetchAllNotificationByUser = asyncHandler(async (req, res) => {
    console.log("first");
    const { _id } = req?.user;
    if (!_id) {
        throw new ApiError(409, "User id is required!");
    }
    console.log("id", _id);
    const notifications = await Notification.find({
        $or: [{ user: _id }, { recipient: _id }],
    })
        .populate("user recipient product") // Populate user, recipient, and product details
        .sort({ createdAt: -1 });

    console.log(notifications);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                notifications,
                "All notifications fetched successfully!",
            ),
        );
});

export { sendBuyNotification, fetchAllNotificationByUser };
