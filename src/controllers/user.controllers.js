import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/aysncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {

    // firstly give the username password email
    // matching the user exits
    // check for imagea ,check for avtar
    // upload the, tp cloudinary ,avatr
    // crate user object - creat entry in db 
    // remove password and refresh token filed from responses
    // check for user creationn 
    // return response

    const { username, fullName, email, password } = req.body;
    console.log("username", req.body);

    if ([username, fullName, email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required")
    }
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new apiError(409, "User already exists with this username or email")
    }
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImagelocalpath = req.files?.coverImage[0]?.path;
    if (!avatarLocalpath || !coverImagelocalpath) {
        throw new apiError(400, "Avatar and cover image are required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalpath);
    const coverImage = await uploadOnCloudinary(coverImagelocalpath);
    if (!avatar) {
        throw new apiError(500, "Error while uploading avatar image")
    }
    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        avatar: avatar.url,
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
export { registerUser };