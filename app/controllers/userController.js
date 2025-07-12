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

exports.generateReferralCode = async ( req, res ) => {
    try {
        const result = await userService.generateReferralCode( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.validateReferralCode = async ( req, res ) => {
    try {
        const result = await userService.validateReferralCode( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.getUserReferrals = async ( req, res ) => {
    try {
        const result = await userService.getUserReferrals( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.deleteUser = async ( req, res ) => {
    try {
        const result = await userService.deleteUser( req.params );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.deleteSelf = async ( req, res ) => {
    try {
        const result = await userService.deleteSelf( req.user );

        if( result.success ) {
            return success( res, result.message, result.data );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.updateDeviceTokens = async ( req, res ) => {
    try {
        const result = await userService.updateDeviceTokens( req.body, req.user );
        if( result.success ) return success( res, result.message, result.data );

        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.requestAccountDeactivation = async ( req, res ) => {
    try {
        const result = await userService.requestAccountDeactivation( req.body, req.user );
        if( result.success ) return success( res, result.message, result.data );

        return error( res, result.message );
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;