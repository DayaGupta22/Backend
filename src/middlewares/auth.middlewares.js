import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'
import { apiError } from '../utils/apiError.js'

export const verifyJwt = asyncHandler(async (req, res, next) => {
    //console.log(req.cookies)
    try {
        const token = req.cookies?.accessToken ||
            req.header('Authorization')?.replace("Bearer", "");

        if (!token) {
            throw new apiError(401, "unauthorized access")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {

            throw new apiError(401, "invalid access token - user not found")
        }
        req.user = user;
        next();

    } catch (error) {
        throw new apiError(401, error?.message || "unauthorized access - invalid token")

    }
})


 export const protect = asynchandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header('authorization')?.replace("Bearer"," ")
        if(!token) throw new apiError(401,"unauthorized access")
           const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decode?._id).select("-password -genrateRefreshToken") 
        if(!user) throw new apiError(401,"inavalid acce3ss tokem user not found ");
         req.user = user;
         next();
    } catch (error) {
        throw apiError (401 ,error?.message || "unauthorized acces signature noot valid ")
        
    }

})

