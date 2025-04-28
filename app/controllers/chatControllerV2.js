const chatService = require('../services/chatServiceV2');
const { success, error, serverError } = require('../utils/responseUtils');

exports.adminChannelClick = async ( req, res ) => {
    try {
        const result = await chatService.adminChannelClick( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.adminChatClick = async ( req, res ) => {
    try {
        const result = await chatService.adminChatClick( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.userActiveChatClick = async ( req, res ) => {
    try {
        const result = await chatService.userActiveChatClick( req.params, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.userChannelClick = async ( req, res ) => {
    try {
        const result = await chatService.userChannelClick( req.params, req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.userListActiveChats = async ( req, res ) => {
    try {
        const result = await chatService.userListActiveChats( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;