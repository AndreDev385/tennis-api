import { config } from 'dotenv'

config();

export const environment = {
    is_production: process.env.IS_PRODUCTION,
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET,
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    },
}
