
// import connectDB from "./db/database.js";
// import express from 'express';
// import app from "./app.js";

// import dotenv from "dotenv";

// dotenv.config({
//     path :'./env'
// });
// const app = express();
// await connectDB();

// app.get('/',(req,res)=>{
//     res.send ("COnnection established with server ")
//  })
// app.listen(process.env.PORT,()=>{
//     console.log (`server is running on port ${process.env.PORT}`);
//  })


import dotenv from "dotenv"
import connectDB from "./db/database.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

await connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})











// import express from "express"
// const app = express()
// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("errror", (error) => {
//             console.log("ERRR: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()


