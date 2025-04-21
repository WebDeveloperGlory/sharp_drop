const { Schema, default: mongoose } = require('mongoose');

const messageSchema = new Schema({
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, trim: true },
    media: {
        url: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            enum: [ 'image', 'video', null ],
            default: null
        },
        thumbnail: {
            type: String,
            trim: true
        },
        duration: {
            type: Number,
            default: 0
        },
        size: { // File size in bytes
            type: Number,
            default: 0
        }
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video'],
        default: 'text',
        required: true
    },
}, {
    timestamps: true
});
  
module.exports = mongoose.model( 'Message', messageSchema );