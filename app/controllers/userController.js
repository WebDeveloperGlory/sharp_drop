const userService = require('../services/userService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.getUserProfile = async ( req, res ) => {
    try {
        const result = await userService.getUserProfile( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;