
import connectDB from "./db/index.js";
import express from 'express';

import dotenv from "dotenv";

dotenv.config({
    path :'./env'
});
const app = express();
await connectDB();

app.get('/',(req,res)=>{
    res.send ("COnnection established with server ")
 })
app.listen(process.env.PORT,()=>{
    console.log (`server is running on port ${process.env.PORT}`);
 })