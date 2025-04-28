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

exports.sendImageMessage = async ( req, res ) => {
    const { chatId } = req.body;
    const imageFile = req.file;
    const senderId = req.user.userId;

    try {
        const result = await messageService.sendImageMessage({ chatId, imageFile, senderId }, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.sendVideoMessage = async ( req, res ) => {
    const { chatId } = req.body;
    const videoFile = req.file;
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