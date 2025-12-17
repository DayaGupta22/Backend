// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload function
// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto", // ✅ FIXED typo
//     });

//     console.log("File uploaded on Cloudinary:", response.secure_url);

//     // ✅ remove local file AFTER successful upload
//     fs.unlinkSync(localFilePath);

//     return response;
//   } catch (error) {
//     // ✅ safe file removal
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }

//     console.error("Error while uploading on Cloudinary:", error.message);
//     throw error;
//   }
// };

// export { uploadOnCloudinary };

import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET
     cloudinary_url: process.env.CLOUDINARY_URL,
})

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;

        // upload the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been succesfully 
        // console.log("file is uplaoad on the cloudinary",response.url);
        fs.unlinkSync (localFilePath);
        return response;
    } catch(error){
        // remove the locally save temporary 
        // file as the upload the operattion got failed 
        fs.unlinkSync(localFilePath);
        console.error("error while uploading on cloudinary",error);
        throw error;
    }
//     console.log(
//   "Cloudinary URL:",
//   process.env.CLOUDINARY_URL ? "LOADED" : "MISSING"
// );

}
export { uploadOnCloudinary }