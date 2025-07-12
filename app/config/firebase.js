const admin = require('firebase-admin');
const serviceAccount = require('./rheel-estate-deeplink-01-firebase-adminsdk-fbsvc-451c99dcb1.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;