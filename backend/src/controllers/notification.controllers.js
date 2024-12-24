import mongoose, { mongo } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { Notification } from "../models/notification.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendBuyNotification = asyncHandler(async (req, res) => {
    const notificationId = req.params;

    if(!notificationId) {
        throw new ApiError(409, "Notification id not found!")
    }

    const notificationObjectId = new mongoose.Types.ObjectId(notificationId.notificationId);
    const notification = await Notification.findById(notificationObjectId);

    if(!notification) {
        throw new ApiError(404, "Notification not found!")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, notification, "Buy Notification send successfully!")
    )
});

export { sendBuyNotification };
