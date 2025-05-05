const fs = require('fs');
const messageService = require('../services/messageService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.sendTextMessage = async ( req, res ) => {
    const { chatId, content } = req.body;
    const senderId = req.user.userId;

    try {
        const result = await messageService.sendMessage({ chatId, content, senderId }, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.sendImageMessage = async (req, res) => {
    const { chatId } = req.body;
    const senderId = req.user.userId;

    try {
        if (!req.file) {
            return error(res, 'No file uploaded');
        }

        const result = await messageService.sendImageMessage({ 
            chatId, 
            filePath: req.file.path,
            senderId,
            mimetype: req.file.mimetype
        }, req.user);

        // Safe file cleanup
        if (req.file.path) {
            try {
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            } catch (cleanupErr) {
                console.error('File cleanup error:', cleanupErr);
                // Don't fail the request just because cleanup failed
            }
        }

        if (result.success) {
            return success(res, result.message, result.data, 201);
        }
        return error(res, result.message);
    } catch (err) {
        // Attempt cleanup if error occurred before service
        if (req.file?.path) {
            try {
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            } catch (cleanupErr) {
                console.error('Error cleanup error:', cleanupErr);
            }
        }
        return serverError(res, err);
    }
};

exports.sendVideoMessage = async ( req, res ) => {
    const { chatId, videoFile } = req.body;
    const senderId = req.user.userId;

    try {
        const result = await messageService.sendVideoMessage({ chatId, videoFile, senderId }, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.markAsRead = async ( req, res ) => {
    try {
        const result = await messageService.markAsRead( req.body, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;