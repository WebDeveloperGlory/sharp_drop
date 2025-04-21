const { Schema, default: mongoose } = require('mongoose');

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
  
module.exports = mongoose.model( 'Channel', channelSchema );