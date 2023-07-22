import { environment } from "../../../config";
import { UploadImageServices } from "./uploadImageService";
import { v2 as Cloudinary } from "cloudinary";

const { cloudinary } = environment;

Cloudinary.config({
    cloud_name: cloudinary.cloud_name,
    api_key: cloudinary.api_key,
    api_secret: cloudinary.api_secret,
});

export class UploadImageCloudinary implements UploadImageServices {

    async upload(path: string): Promise<string> {
        const result = await Cloudinary.uploader.upload(path);
        return result.secure_url;
    }

}
