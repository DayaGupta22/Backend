import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";


const connectDB = async () => {
   try {
    const connecInstance = await mongoose.connect (`${process.env.MONGO_URL}/${DB_NAME}`)
     console.log("Database connected succesfully ")
     console.log(`MongoDB connected: ${connecInstance.connection.host}`);
     process.exit(1);
   }
   catch (err){
    console.error("connection failed", err);
    throw err;
   }
};
export default connectDB;

















/*
import express from 'express';
import dotenv from "dotenv";
const app = express()
// ifffy type connection
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    }
    catch (err){
        console.error("connection failed",err);
        throw err;
    }

})() */