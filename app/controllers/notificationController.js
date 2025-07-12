const notificationService = require('../services/notificationService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.retrieveAllNotifications = async ( req, res ) => {
    try {
        const result = await notificationService.retrieveAllNotifications( req.user );
        if( result.success ) return success( res, result.message, result.data );

        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.markNotificationAsRead = async ( req, res ) => {
    try {
        const result = await notificationService.markNotificationAsRead( req.params, req.user );
        if( result.success ) return success( res, result.message, result.data );

        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.markAllNotificationsAsRead = async ( req, res ) => {
    try {
        const result = await notificationService.markAllNotificationsAsRead( req.user );
        if( result.success ) return success( res, result.message, result.data );

        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;