const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config/env');

// Configure Cloudinary
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

async function uploadMedia(filePath, resourceType = 'auto', options = {}) {
    try {
        // Let Cloudinary automatically handle the file type (image/video/raw)
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: resourceType,
            ...options
        });
        
        // Clean up the temporary file
        fs.unlinkSync( filePath );
        
        return {
            url: result.secure_url,
            type: result.resource_type,
            width: result.width,
            height: result.height,
            duration: result.duration,
            size: result.bytes,
            thumbnail: result.resource_type === 'video' ? 
                result.secure_url.replace('.mp4', '.jpg') : // Cloudinary auto-generates thumbnails
                null
        };
    } catch (error) {
        // Clean up even if upload fails
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        throw error;
    }
}

module.exports = {
    uploadMedia
};