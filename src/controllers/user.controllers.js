import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
// genrate acess token and refresh token on both at a time 
// it is easy to used in login controller
const generateAcessAndRefeshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.genrateAcessToken()
        const refreshToken = user.genrateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new apiError(500, "some thing went wrong while generating acess and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    // firstly give the username password email
    // matching the user exits
    // check for image ,check for avtar
    // upload the, tp cloudinary ,avatr
    // crate user object - creat entry in db 
    // remove password and refresh token filed from responses
    // check for user creationn 
    // return response

    const { username, fullName, email, password } = req.body;
    console.log(req.body);

    if ([username, fullName, email, password].some((field) => field?.trim() === " ")) {
        throw new apiError(400, "All fields are required") // this apiError are handles the error where it is used
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new apiError(409, "User already exists with this username or email")
    }

    console.log("req.files data", req.files);

    const avatarLocalpath = req.files?.avatar[0]?.path; // get path from local path in pulic temp
    let coverImagelocalpath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    if (!avatarLocalpath) {
        throw new apiError(400, "Avatar image are required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalpath);
    const coverImage = await uploadOnCloudinary(coverImagelocalpath);
    // console.log("cover image upload response", coverImage);
    // console.log("avatar upload response", avatar);
    if (!avatar) {
        throw new apiError(500, "Error while uploading avatar image")
    }
    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        avatar: avatar?.url || " ",
        coverImage: coverImage?.url || " ",
        email,
        password
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if (!createdUser) {
        throw new apiError(500, " some thing went wrong User not created successfully")
    }
    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered successfully"
        ))

})


const loginUser = asyncHandler(async (req, res) => {
    //req.body = data
    // // username  or email or password 
    //find the user 
    // password check
    // acccess token and refresh tokenn genrate 
    // send secure cookies 

    console.log(req.body)
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new apiError(400, "Username or email is required to login")
    }


    const user = await User.findOne({
        $or: [{ username }, { email }]   // do main se ek se user hai ki nhi--> dekhna 
    })


    if (!user) {
        throw new apiError(404, "User not found with this username or email")
    }


    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new apiError(401, "password is incorrect ");
    }

    const { accessToken, refreshToken } = await generateAcessAndRefeshToken(user._id)
    const userLoggedIn = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: userLoggedIn,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );

})
const logoutUser = asyncHandler(async (req, res) => {
    //clear the cookies
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
        {
            new: true
        })
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, {}, "User logged out "))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken ||
        req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new apiError(401, "unauthorized acess")
    }

    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodeToken?._id)
        if (!user) {
            throw new apiError(401, "invalid refrersh token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Refrsh token is expired or used ")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newrefreshToken } = await generateAcessAndRefeshToken(user._id)
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
                new apiResponse(
                    200,
                    { accessToken, refreshToken: newrefreshToken },
                    "acess token is refreshed "
                )

            )
    } catch (error) {
        throw new apiError(400, error?.message || "invalid refresh token ")

    }

})


export { registerUser, loginUser, logoutUser, refreshAccessToken };
