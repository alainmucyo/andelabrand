import fs from "fs";
import cloudinary from "../config/cloudinary";

export const cloudinaryUpload = async path => {
    const uniqueFilename = new Date().toISOString()
    // const folder = process.env.APP_ENV == "test" ? process.env.CLOUDINARY_TEST_FOLDER : process.env.CLOUDINARY_PROD_FOLDER
   const folder= process.env.CLOUDINARY_TEST_FOLDER
    try {
        const {url} = await cloudinary.upload(path, {
            public_id: `${folder}/${uniqueFilename}`,
            tags: folder
        })
        fs.unlinkSync(path)
        return url
    } catch (e) {

        return null
    }
}