import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Async upload function (base64 or URL)
export async function imageUploadUtil(fileData, folderName = "products") {
  const result = await cloudinary.uploader.upload(fileData, {
    resource_type: "auto",
    folder: folderName,
  });
  return result;
}

export { cloudinary };
