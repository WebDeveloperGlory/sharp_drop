const chatService = require('../services/chatService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.adminGetAllChats = async ( req, res ) => {
    try {
        const result = await chatService.adminGetAllChats();

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.userGetChatDetails = async ( req, res ) => {
    try {
        const result = await chatService.userGetChatDetails( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.startChat = async ( req, res ) => {
    try {
        const result = await chatService.startChat( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.adminJoinChat = async ( req, res ) => {
    try {
        const result = await chatService.adminJoinChat( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.adminLeaveChat = async ( req, res ) => {
    try {
        const result = await chatService.adminLeaveChat( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.setChatAsInactive = async ( req, res ) => {
    try {
        const result = await chatService.setChatAsInactive( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.adminGetChatMessages = async ( req, res ) => {
    try {
        const result = await chatService.adminGetChatMessages( req.query, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;