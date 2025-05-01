const db = require('../config/db');

exports.adminGetAllOrders = async () => {
    // Get All Orders
    const allOrders = await db.Order.find()
        .populate([
            {
                path: 'admin',
                select: 'firstName lastName email'
            },
            {
                path: 'user',
                select: 'firstName lastName email'
            },
        ]);

    // Return success
    return { success: true, message: 'User Orders Acquired', data: allOrders }    
}

exports.userGetAllOrders = async ({ userId }) => {
    // Get All Orders
    const allOrders = await db.Order.find({ user: userId })
        .populate({
            path: 'admin',
            select: 'firstName lastName email'
        });

    // Return success
    return { success: true, message: 'User Orders Acquired', data: allOrders }
}

exports.createNewOrder = async ({ tradeName, description, price, quantity, tradeType, targetUser }, { userId }) => {
    // Check if target user exists
    const foundUser = await db.User.findById( targetUser );
    if( !foundUser ) return { success: false, message: 'Invalid User' };
    
    // Create order
    const order = new db.Order({
        user: targetUser,
        admin: userId,
        tradeName, description, price, quantity, tradeType
    });
    await order.save();

    // Return success
    return { success: true, message: 'Order Created', data: order };
}

exports.confirmOrder = async ({ orderId }, { securityPin }, { userId }) => {
    // Check if target user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if order exists
    const foundOrder = await db.Order.findOne({ _id: orderId, user: userId });
    if( !foundOrder ) return { success: false, message: 'Invalid Order' };

    // Check if securityPin is correct
    const isSecurityPinMatch = await foundUser.comparePin( securityPin );
    if( !isSecurityPinMatch ) return { success: false, message: 'Invalid Security Pin' };

    // Update order confirmation status
    const updatedOrder = await db.Order.findByIdAndUpdate(
        orderId,
        { confirmed: true },
        { new: true }
    );

    // Return success
    return { success: true, message: 'Order Confirmed', data: updatedOrder };
}

module.exports = exports;