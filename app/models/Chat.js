const { Schema, default: mongoose } = require('mongoose');

const chatSchema = new Schema({
    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // admin: { type: Schema.Types.ObjectId, ref: 'User' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    messages: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    unreadCount: { type: Number, default: 0 },
    userUnreadCount: { type: Number, default: 0 },
    adminUnreadCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    endedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});
  
module.exports = mongoose.model( 'Chat', chatSchema );