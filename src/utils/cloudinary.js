import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;

        // upload the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_tpe:"auto"
        })
        // file has been succesfully 
        console.log("file is uplaoad on the cloudinary",response.url);
        return response;
    } catch(error){
        // remove the locally save temporary 
        // file as the upload the operattion got failed 
        fs.unlinkSync(localFilePath);
        console.error("error while uploading on cloudinary",error);
        throw error;
    }
}
export { uploadOnCloudinary }