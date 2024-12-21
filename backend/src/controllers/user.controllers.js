import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
    httpOnly: true,
    secure: true,
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
    const { username, fullName, email, phone, password, address, isSeller } =
        req.body;

    if (
        [username, fullName, email, phone, password, address].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }, { phone }],
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User  with this email, username, or phone already exists!",
        );
    }

    let profileImagePath;
    if (req.file && req.file.path.length > 0) {
        profileImagePath = req.file.path;
    }

    if (!profileImagePath) {
        throw new ApiError(400, "Profile image is required!");
    }

    const profileImageUrl = await uploadOnCloudinary(profileImagePath);

    if (!profileImageUrl) {
        throw new ApiError(500, "Error while uploading on cloudinary!");
    }
    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        phone,
        password,
        address,
        profileImage: profileImageUrl,
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

    if (
        [username, email, phone, password].some(
            (field) => String(field).trim().length === 0,
        )
    ) {
        throw new ApiError(400, "All fields are required!");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }, { phone }],
    });

    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    console.log(user);
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id,
    );

    const loggedInUser = await User.findById(user?._id).select(
        "-password -refreshToken",
    );

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

const logoutUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser };
