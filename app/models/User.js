const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const { generateUniqueReferralCode } = require('../utils/referralUtils');

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    number: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    securityPin: { type: String },
    role: {
        type: String,
        enum: [ 'superAdmin', 'admin', 'user' ],
        default: 'user'
    },
    referralCode: { type: String, unique: true, default: null },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isOnline: { type: Boolean, default: false },
    isDeactivated: { type: Boolean, default: false },
    deactivationReason: { type: String },
    deactivationStatus: { type: String, enum: ['unapproved', 'approved' ] },
    lastSeen: { type: Date, default: Date.now },
    deviceTokens: [{
        token: { type: String },
        platform: {
            type: String,
            enum: ['web', 'android', 'ios']
        },
        createdAt: Date
    }],
}, {
    timestamps: true
});

userSchema.pre('save', async function ( next ) {
    try {
        const user = this;

        // Hash password
        if( user.isModified('password') ) {
            const salt = await bcrypt.genSalt( 10 );
            user.password = await bcrypt.hash( user.password, salt );
        }
    
        // Hash security pin
        if( user.isModified('securityPin') ) {
            const salt = await bcrypt.genSalt( 10 );
            user.securityPin = await bcrypt.hash( user.securityPin, salt );
        }

        // Generate referral code for new users
        if (user.isNew && !user.referralCode) {
            user.referralCode = await generateUniqueReferralCode();
        }
    
        next();    
    } catch  ( error ) {
        return next( error );
    }
});

userSchema.methods.comparePassword = async function( candidatePassword ) {
    return await bcrypt.compare( candidatePassword, this.password );
}
userSchema.methods.comparePin = async function( candidatePin ) {
    return await bcrypt.compare( candidatePin, this.securityPin );
}

module.exports = mongoose.model( 'User', userSchema );