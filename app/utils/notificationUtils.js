const db = require('../config/db');
const admin = require('../config/firebase');
const { EMAIL_USER, EMAIL_PASS,  OWNER_EMAIL } = require('../config/env');
const { batchRemoveInvalidTokens } = require('./firebaseUtils');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// EMAIL NOTIFICATIONS //
async function sendEmailOTPNotification( email, otp ) {
    const mailOptions = {
        from: `"Fyndr" <${ EMAIL_USER }>`,
        to: email,
        subject: 'Your OTP Code',
        html: `
            <div style="font-family: sans-serif; padding: 10px;">
            <h2>Your One-Time Password</h2>
            <p>Use the following OTP to complete your action:</p>
            <h3 style="color: #2e86de;">${otp}</h3>
            <p>This code will expire in ${ Number( OTP_EXPIRATION ) / 10 } minutes.</p>
            </div>
        `
    };
    
    try {
        await transporter.sendMail( mailOptions );
        console.log(`OTP sent to ${ email }`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}
// END OF EMAIL NOTIFICATIONS //

// PUSH NOTIFICATIONS //
async function sendPushNotification({ body, title, tokens }) {
    // const message = {
    //     notification: {
    //         title,
    //         body
    //     },
    //     tokens
    // }
    const messages = tokens.map(token => ({
        token,
        notification: { title, body }
    }))

    try {
        // const response = await admin.messaging().sendMulticast(message);
        const response = await admin.messaging().sendAll(messages);
    
        console.log('Successful sends:', response.successCount);
        console.log('Failed sends:', response.failureCount);
    
        // Array to collect invalid tokens for batch removal
        const invalidTokens = [];
    
        response.responses.forEach((resp, idx) => {
            if (!resp.success) {
                const token = message.tokens[idx];
                console.error(`Failed to send to token ${token}:`, resp.error);
            
                // Check for invalid token errors
                if (
                    resp.error.code === 'messaging/invalid-registration-token' || 
                    resp.error.code === 'messaging/registration-token-not-registered'
                ) {
                    invalidTokens.push(token);
                }
            }
        });

        // Remove all invalid tokens in a batch if any were found
        if (invalidTokens.length > 0) {
            console.log(`Removing ${invalidTokens.length} invalid tokens...`);
            await batchRemoveInvalidTokens( invalidTokens );
        }

        return {
            successCount: response.successCount,
            failureCount: response.failureCount,
            invalidTokens: invalidTokens
        };
    } catch (error) {
        console.error('Overall send error:', error);
        throw error;
    }
}
// END OF PUSH NOTIFICATIONS //

// GENERAL NOTIICATIONS //
async function sendNewMessageNotiication({ userId, deviceTokens }) {
    const createUserNotification = new db.Notification({
        userId,
        title: 'New Message Received',
        message: 'You have received a new message. Visit your chat to view the details.',
        type: 'message',
    });
    await createUserNotification.save();

    if( deviceTokens && deviceTokens.length > 0 ) {
        const tokens = deviceTokens.map( token => token.token );
        await sendPushNotification({
            title: 'New Message Received',
            body: 'You have received a new message',
            tokens
        })
    }
}
// END OF GENERAL NOTIICATIONS //

module.exports = {
    sendNewMessageNotiication,
};