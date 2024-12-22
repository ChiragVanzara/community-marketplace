import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";
import { ApiError } from "./ApiError.js";

configDotenv({
    path: "./.env",
});

const my_cloud_name = process.env.CLOUD_NAME;
const my_api_key = process.env.API_KEY;
const my_api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name: my_cloud_name,
    api_key: my_api_key,
    api_secret: my_api_secret,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log(
            `File is uploaded on cloudinary and its url is: ${res.url}`,
        );
        fs.unlinkSync(localFilePath);

        return res.url;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("error: ", error);
    }
};

const deleteFromCloudinary = async (imageUrl) => {
    try {
        const url = new URL(imageUrl);
        const pathname = url.pathname;
        const segments = pathname.split("/");
        const publicIdWithExtension = segments[segments.length - 1];
        const publicId = publicIdWithExtension.split(".")[0];

        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result);
        return result;
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting from cloudinary!");
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
