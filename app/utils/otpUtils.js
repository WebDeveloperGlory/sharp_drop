const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { OTP_EXPIRATION, EMAIL_USER, EMAIL_PASS } = require('../config/env');

const generateOtp = () => {
    const otp = crypto.randomInt(1000, 10000);
    return otp.toString();
}

const setOtp = ( user ) => {
    const otp = generateOtp();

    user.otp = otp;
    user.otpExpiresAt = new Date( Date.now() + ( OTP_EXPIRATION * 1000 ) );

    return otp;
}

const verifyOtp = ( user, otp ) => {
    const currentDate = new Date();

    if( !user.otp || user.otpExpiresAt < currentDate ) return false;
    return user.otp === otp;
}

const sendOtpEmail = async ( userEmail, otp ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
  
    const mailOptions = {
        from: `"Friendly Inc. Consumer and Seller App" <${ EMAIL_USER }>`,
        to: userEmail,
        subject: 'Your OTP Code',
        html: `
            <div style="font-family: sans-serif; padding: 10px;">
            <h2>Your One-Time Password</h2>
            <p>Use the following OTP to complete your action:</p>
            <h3 style="color: #2e86de;">${otp}</h3>
            <p>This code will expire in 10 minutes.</p>
            </div>
        `
    };
  
    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

module.exports = {
    setOtp,
    verifyOtp,
    sendOtpEmail
}