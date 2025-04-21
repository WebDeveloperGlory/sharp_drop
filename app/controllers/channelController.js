const channelService = require('../services/channelService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getAllChannels = async ( req, res ) => {
    try {
        const result = await channelService.getAllChannels();

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.createChannel = async ( req, res ) => {
    try {
        const result = await channelService.createChannel( req.body, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;