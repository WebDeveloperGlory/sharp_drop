const db = require('../config/db');

const removeInvalidUserToken = async ( invalidToken ) => {
    try {
        // Remove token from all users that have it
        const userResult = await db.User.updateMany(
            { 'deviceTokens.token': invalidToken },
            { $pull: { deviceTokens: { token: invalidToken } } }
        );
        const merchantResult = await db.Merchant.updateMany(
            { 'deviceTokens.token': invalidToken },
            { $pull: { deviceTokens: { token: invalidToken } } }
        );

        console.log(`Removed invalid token ${invalidToken}. Matched ${userResult.matchedCount} users, ${merchantResult.matchedCount} merchants, modified ${userResult.modifiedCount + merchantResult.modifiedCount} users/merchants.`);
        return userResult;
    } catch (error) {
        console.error('Error removing invalid token:', error);
        throw error;
    }
}

const batchRemoveInvalidTokens = async ( invalidTokens ) => {
    try {
        const userResult = await db.User.updateMany(
            {},
            { $pull: { deviceTokens: { token: { $in: invalidTokens } } } },
            { multi: true }
        );
        const merchantResult = await db.Merchant.updateMany(
            {},
            { $pull: { deviceTokens: { token: { $in: invalidTokens } } } },
            { multi: true }
        );
        console.log('Invalid tokens removed successfully');
    } catch (error) {
        console.error('Error removing invalid token:', error);
        throw error;
    }
}

module.exports = {
    removeInvalidUserToken,
    batchRemoveInvalidTokens,
}