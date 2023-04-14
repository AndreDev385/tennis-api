import { config } from 'dotenv'

config();

export const environment = {
    is_production: process.env.IS_PRODUCTION,
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET,
}
