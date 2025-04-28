const db = require('../config/db');
const { uploadMedia } = require('./mediaProcessingService');

exports.sendMessage = async ({ chatId, senderId, content, type = 'text' }, { role }) => {
    // Create message
    const message = new db.Message({
        chat: chatId,
        sender: senderId,
        content,
        type
    })
    await message.save();

    // Update chat's last message and add to messages array
    await db.Chat.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
        $push: { messages: message._id },
        $inc: { unreadCount: 1 },
        $inc: { userUnreadCount: role === 'user' ? 1 : 0 },
        $inc: { adminUnreadCount: role === 'admin' || 'superAdmin' ? 1 : 0 },
    });

    // Emit the message via Socket.IO
    // this.socket.to(chatId.toString()).emit('new_message', message);

    return { success: true, message: 'Message Sent', data: message }
}

exports.markAsRead = async ({ chatId }, { userId }) => {
    await db.Chat.findByIdAndUpdate( chatId, { unreadCount: 0 } );
    // this.socket.to(chatId.toString()).emit('messages_read', { chatId, userId });

    // Return success
    return { success: true, message: 'Chat Marked As Read', data: null }
}

exports.sendVideoMessage = async ({ chatId, senderId, videoFile }, { role }) => {
    // Upload to Cloudinary - it will handle all processing
    const mediaInfo = await uploadMedia(videoFile.path, 'video', {
        folder: 'chat_videos',
        eager: [
            { quality: 'auto', fetch_format: 'auto' }, // Optimized video
            { quality: 'auto', fetch_format: 'auto', format: 'jpg' } // Auto-generated thumbnail
        ]
    });

    // Create message
    const message = new db.Message({
        chat: chatId,
        sender: senderId,
        type: 'video',
        media: {
            url: mediaInfo.url,
            type: 'video',
            thumbnail: mediaInfo.thumbnail,
            duration: Math.round(mediaInfo.duration || 0),
            size: mediaInfo.size,
            width: mediaInfo.width,
            height: mediaInfo.height
        }
    });
    await message.save();

    // Update chat
    await db.Chat.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
        $push: { messages: message._id },
        $inc: { unreadCount: 1 },
        $inc: { userUnreadCount: role === 'user' ? 1 : 0 },
        $inc: { adminUnreadCount: role === 'admin' || 'superAdmin' ? 1 : 0 },
    });

    // Emit via Socket.IO
    // this.socket.to(chatId.toString()).emit('new_message', message);

    // Return success
    return { success: true, message: 'Video Sent', data: message }
}

exports.sendImageMessage = async ({ chatId, senderId, imageFile }, { role }) => {
    // Upload to Cloudinary
    const mediaInfo = await uploadMedia(imageFile.path, 'image', {
        folder: 'chat_images',
        quality: 'auto',
        fetch_format: 'auto'
    });

    // Create message
    const message = new db.Message({
        chat: chatId,
        sender: senderId,
        type: 'image',
        media: {
            url: mediaInfo.url,
            type: 'image',
            size: mediaInfo.size,
            width: mediaInfo.width,
            height: mediaInfo.height
        }
    });
    await message.save();

    // Update chat
    await db.Chat.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
        $push: { messages: message._id },
        $inc: { unreadCount: 1 },
        $inc: { userUnreadCount: role === 'user' ? 1 : 0 },
        $inc: { adminUnreadCount: role === 'admin' || 'superAdmin' ? 1 : 0 },
    });

    // Emit via Socket.IO
    // this.socket.to(chatId.toString()).emit('new_message', message);

    // Return success
    return { success: true, message: 'Image Sent', data: message }
}
module.exports = exports;