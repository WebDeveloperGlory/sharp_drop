require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    OTP_EXPIRATION: process.env.OTP_EXPIRATION,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
}