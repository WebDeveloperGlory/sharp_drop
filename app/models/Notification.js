const { Schema, default: mongoose } = require('mongoose');

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, },
    isRead: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model( 'Notification', notificationSchema );