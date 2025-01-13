import { asyncHandler } from "../utils/asyncHandler.js";
import { Notification } from "../models/notification.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendBuyNotification = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const notifications = await Notification.find({ seller: userId }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, { notifications }, "Notifications fetched successfully!")
    );
});

export { sendBuyNotification };
