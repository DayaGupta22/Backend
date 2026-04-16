import {Subscription} from '../models/subscription.models.js'
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

export const getComment = asyncHandler (async(req,res)=>{
   return res.status(201).json(
        new apiResponse(200, {}, "comment found  successfully"
        ))
})
