const db = require('../config/db');

exports.getAllChannels = async ({ isActive = true } = {}) => {
    // Get all channels
    const allChannels = await db.Channel.find({ isActive });

    // Return success
    return {
        success: true,
        message: `All ${isActive ? 'Active' : 'Inactive'} Channels Acquired`,
        data: allChannels
    };
};

exports.createChannel = async ({ name, color }, { userId }) => {
    // Check if channel exists
    const channelWithName = await db.Channel.findOne({ name });
    const channelWithColor = await db.Channel.findOne({ color });
    if( channelWithName ) return { success: false, message: 'Channel With Same Name Exists' };
    if( channelWithColor ) return { success: false, message: 'Channel With Same Color Exists' };

    // Create channel
    const createdChannel = await db.Channel.create({ 
        name, color,
        createdBy: userId,
    });
    if( !createdChannel ) return { success: false, message: 'Error Creating Channel' };

    // Return success
    return { success: true, message: 'Channel Created', data: createdChannel };
}

exports.setChannelActiveStatus = async ({ channelId }, { isActive }) => {
    // Check if channel exists
    const channel = await db.Channel.findByIdAndUpdate(
        channelId,
        { isActive },
        { new: true }
    );
    if (!channel) {
        return {
            success: false,
            message: 'Channel not found'
        };
    }

    // Return success
    return {
        success: true,
        message: `Channel status updated to ${isActive ? 'active' : 'inactive'}`,
        data: channel
    };
};

module.exports = exports;