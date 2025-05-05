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
            filePath: req.file.path, // Now using file path instead of buffer
            senderId,
            mimetype: req.file.mimetype
        }, req.user);

        // Clean up the temporary file
        fs.unlinkSync(req.file.path);

        if (result.success) {
            return success(res, result.message, result.data, 201);
        }
        return error(res, result.message);    
    } catch (err) {
        // Clean up if file exists
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
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