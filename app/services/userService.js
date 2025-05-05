const db = require('../config/db');
const { generateUniqueReferralCode } = require('../utils/referralUtils');

exports.getUserProfile = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).populate({ path: 'referredBy', select: 'email' }).select('-password -securityPin').lean();
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Get number of user referrals
    const referralCount = await db.User.countDocuments({ referredBy: foundUser._id });

    // Return success
    return { 
        success: true, 
        message: 'User Details Acquired', 
        data: {
            ...foundUser,
            referralCount,
        } 
    };
}

exports.generateReferralCode = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if user already has a referral code
    if( foundUser.referralCode ) return { success: false, message: 'Referal Code Already Exists' }

    // Generate referral code
    const referralCode = await generateUniqueReferralCode();
    foundUser.referralCode = referralCode;
    await foundUser.save();

    // Return success
    return { success: true, message: 'Referral Code Generated', data: referralCode }
}

exports.validateReferralCode = async ({ referralCode }) => {
    // Check if user with the referral code exists
    const foundUser = await db.User.findOne({ referralCode }).select('email').lean();
    if( !foundUser ) return { success: false, message: 'Invalid Referral Code' };

    // Return success
    return { success: true, message: 'Valid Referral Code', data: foundUser.email };
}

exports.getUserReferrals = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password -securityPin');
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Get all user referrals
    const referrals = await db.User.find({ referredBy: foundUser._id }).select('firstName lastName email number -_id');
    const referralEmails = referrals.map( referral => referral.email );

    // Return success
    return { success: true, message: 'All Referrals Acquired', data: referrals };
}

module.exports = exports;