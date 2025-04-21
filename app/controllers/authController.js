const authService = require('../services/authService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.registerUser = async ( req, res ) => {
    try {
        const result = await authService.registerUser( req.body );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.registerAdmin = async ( req, res ) => {
    try {
        const result = await authService.registerAdmin( req.body );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.registerSuperAdmin = async ( req, res ) => {
    try {
        const result = await authService.registerSuperAdmin( req.body );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.setSecurityPin = async ( req, res ) => {
    try {
        const result = await authService.setSecurityPin( req.body );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.loginUser = async ( req, res ) => {
    try {
        const result = await authService.loginUser( req.body );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.loginAdmin = async ( req, res ) => {
    try {
        const result = await authService.loginAdmin( req.body );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.logoutUser = async ( req, res ) => {
    try {
        const result = await authService.logoutUser( req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;