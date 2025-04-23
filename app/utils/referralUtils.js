const db = require('../config/db');

const REFERRAL_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const REFERRAL_CODE_LENGTH = 8;
const MAX_REFERRAL_TRIES = 10;

const generateRandomReferralCode = () => {
    let result = '';

    for( let i = 0; i < REFERRAL_CODE_LENGTH; i++ ) {
        result += REFERRAL_CHARS.charAt( Math.floor( Math.random() * REFERRAL_CHARS.length ) );
    }

    return result
}

const generateUniqueReferralCode = async () => {
    let attempts = 0;

    while( attempts < MAX_REFERRAL_TRIES ) {
        // Generate code
        const code = generateRandomReferralCode();

        const existingCode = await db.User.findOne({ referralCode: code });
        if( !existingCode ) return code;

        attempts++;
    }

    throw new Error('Failed to generate unique referral code');
}

const processReferral = async ({ referralCode, userId }) => {
    // Check if referral code is passed
    if( !referralCode ) return { success: false, message: 'No Referral Code' };

    try {
        // Check who has referral code
        const referringUser = await db.User.findOne({ referralCode });
        if( !referringUser ) return { success: false, message: 'Invalid Referral Code' };

        // Update users referredBy field
        await db.User.findOneAndUpdate(
            { _id: userId },
            { referredBy: referringUser._id },
        );

        // Return success
        return {
            success: true,
            message: 'Referral Processed'
        }
    } catch( err ) {
        console.error('Error processing referral', err );
        return { success: false, message: 'Error Procesing Referral' };
    }
}

module.exports = {
    generateUniqueReferralCode,
    processReferral,
}