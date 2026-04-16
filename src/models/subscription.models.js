import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subcriber:{
        type :mongoose.Schema.Types.ObjectId,
        ref :"user"
    },
    channerl:{
       type :mongoose.Schema.Types.ObjectId,
        ref :"user" 
    }
},{timestamps:true})
export const Subscription = mongoose.model("Subscription" ,subscriptionSchema)