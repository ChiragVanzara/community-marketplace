import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    domain: "localhost",
    maxAge: 24 * 60 * 60 * 1000,
};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            error?.message || "Error while generating tokens!",
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {
        username,
        fullName,
        email,
        phone,
        password,
        address,
        isSeller,
        profileImage,
    } = req.body;

    if (
        [username, fullName, email, password, address].some((field) => {
            field?.trim() === "";
        })
    ) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }, { phone }],
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User with this email, username, or phone already exists!",
        );
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        phone,
        password,
        address,
        profileImage,
        isSeller,
    });

    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken",
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, phone, password } = req.body;
    // console.log(username, email, phone, password);
    if (
        [username, email, phone, password].every(
            (field) => String(field).trim().length === 0,
        )
    ) {
        throw new ApiError(400, "Username, Email, Phone atleast one required!");
    }
    // console.log("after checking");
    const user = await User.findOne({
        $or: [{ username }, { email }, { phone }],
    });
    // console.log("user: ", user);
    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id,
    );

    // console.log(accessToken, refreshToken);
    const loggedInUser = await User.findById(user?._id).select(
        "-password -refreshToken",
    );

    // console.log(loggedInUser);

    return res
        .status(200)
        .cookie("chitram_accessToken", accessToken, options)
        .cookie("chitram_refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully!",
            ),
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        },
    );

    return res
        .status(200)
        .clearCookie("chitram_accessToken")
        .clearCookie("chitram_refreshToken")
        .json(new ApiResponse(200, {}, "User successfully logged out!"));
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user?._id;
    if (userId) {
        throw new ApiError(401, "Unautharized request!");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    const isPasswordValid = user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(403, "Password is incorrect!");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully!"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully!",
            ),
        );
});

const updateUserDetails = asyncHandler(async (req, res) => {
    const { username, fullName, email, phone, address } = req.body;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: updateFields },
        { new: true, runValidators: true },
    ).select("-password -refreshToken");

    if (!user) {
        return res.status(404).json({ msg: "User  not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User details updated successfully!"));
});

const updateProfileImage = asyncHandler(async (req, res) => {
    let profileImagePath;

    if (req.file && req.file.path.length > 0) {
        profileImagePath = req.file.path;
    }

    if (!profileImagePath) {
        throw new ApiError(409, "Profile image not found!");
    }

    const profileImageUrl = await uploadOnCloudinary(profileImagePath);
    if (!profileImageUrl) {
        throw new ApiError(409, "Error while uploading on cloudinary!");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profileImage: profileImageUrl,
            },
        },
        { new: true },
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Profile image is updated successfully!",
            ),
        );
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(id);
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "Product not found!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully!"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser,
    updateUserDetails,
    updateProfileImage,
    getUserById,
};
