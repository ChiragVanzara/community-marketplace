import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { Notification } from "../models/notification.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendBuyNotification = asyncHandler(async (req, res) => {

});

export { sendBuyNotification };
