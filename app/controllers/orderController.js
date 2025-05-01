const orderService = require('../services/orderService');
const { success, error, serverError } = require('../utils/responseUtils');

exports.adminGetAllOrders = async ( req, res ) => {
    try {
        const result = await orderService.adminGetAllOrders();

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.confirmOrder = async ( req, res ) => {
    try {
        const result = await orderService.confirmOrder( req.params, req.body, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.createNewOrder = async ( req, res ) => {
    try {
        const result = await orderService.createNewOrder( req.body, req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

exports.userGetAllOrders = async ( req, res ) => {
    try {
        const result = await orderService.userGetAllOrders( req.user );

        if( result.success ) {
            return success( res, result.message, result.data, 201 );
        }
        return error( res, result.message );    
    } catch ( err ) {
        return serverError( res, err );
    }
}

module.exports = exports;