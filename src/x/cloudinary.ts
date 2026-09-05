import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dorcgl1jg",
  api_key: process.env.CLOUDINARY_API_KEY || "547527123686674",
  api_secret: process.env.CLOUDINARY_API_SECRET || "-5omih9Vk_lBhFL3pwNfmT0SFgI",
  secure: true,
});

export { cloudinary };
export default cloudinary;
