const db = require('../config/db');

exports.getUserProfile = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password -securityPin');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Return success
    return { success: true, message: 'User Details Acquired', data: foundUser };
}

module.exports = exports;