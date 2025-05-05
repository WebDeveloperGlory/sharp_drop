const db = require('../config/db');
const { uploadMedia } = require('./mediaProcessingService');
const { getSocketService } = require('./socketService');

exports.sendMessage = async ({ chatId, senderId, content, type = 'text' }, { role }) => {
    // Create message
    const message = new db.Message({
        chat: chatId,
        sender: senderId,
        content,
        type
    })
    await message.save();

    const populatedMessage = await db.Message.findById(message._id)
        .populate({
            path: 'sender',
            select: 'firstName lastName email'
        });

    // Update chat's last message and add to messages array
    await db.Chat.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
        $push: { messages: message._id },
        $inc: { 
            unreadCount: 1,
            userUnreadCount: role === 'admin' || role === 'superAdmin' ? 1 : 0,
            adminUnreadCount: role === 'user' ? 1 : 0
        }
    });

    // Emit the message via Socket.IO
    const socketService = getSocketService();
    if (socketService) {
        socketService.emitNewMessage(chatId, populatedMessage);
    }

    return { success: true, message: 'Message Sent', data: message }
}

exports.markAsRead = async ({ chatId }, { userId }) => {
    await db.Chat.findByIdAndUpdate( chatId, { unreadCount: 0 } );

    // Emit via Socket.IO
    const socketService = getSocketService();
    if (socketService) {
        socketService.emitMessagesRead(chatId, userId);
    }

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

    const populatedMessage = await db.Message.findById(message._id)
        .populate({
            path: 'sender',
            select: 'firstName lastName email'
        });

    // Update chat
    await db.Chat.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
        $push: { messages: message._id },
        $inc: { 
            unreadCount: 1,
            userUnreadCount: role === 'admin' || role === 'superAdmin' ? 1 : 0,
            adminUnreadCount: role === 'user' ? 1 : 0
        }
    });

    // Emit via Socket.IO
    const socketService = getSocketService();
    if (socketService) {
        socketService.emitNewMessage(chatId, populatedMessage);
    }

    // Return success
    return { success: true, message: 'Video Sent', data: message }
}

exports.sendImageMessage = async ({ chatId, senderId, filePath, mimetype }, { role }) => {
    try {
        // Determine resource type
        const isVideo = mimetype.startsWith('video/');
        const resourceType = isVideo ? 'video' : 'image';
        const folder = isVideo ? 'chat_videos' : 'chat_images';

        // Upload to Cloudinary
        const mediaInfo = await uploadMedia(filePath, resourceType, {
            folder,
            quality: 'auto',
            fetch_format: 'auto'
        });

        // Create message
        const message = new db.Message({
            chat: chatId,
            sender: senderId,
            type: resourceType,
            media: {
                url: mediaInfo.url,
                type: resourceType,
                size: mediaInfo.size,
                width: mediaInfo.width,
                height: mediaInfo.height,
                ...(isVideo && { duration: mediaInfo.duration })
            }
        });

        await message.save();

        const populatedMessage = await db.Message.findById(message._id)
            .populate({
                path: 'sender',
                select: 'firstName lastName email'
            });

        // Update chat
        await db.Chat.findByIdAndUpdate(chatId, {
            lastMessage: message._id,
            $push: { messages: message._id },
            $inc: { 
                unreadCount: 1,
                userUnreadCount: role === 'admin' || role === 'superAdmin' ? 1 : 0,
                adminUnreadCount: role === 'user' ? 1 : 0
            }
        });

        // Emit via Socket.IO
        const socketService = getSocketService();
        if (socketService) {
            socketService.emitNewMessage(chatId, populatedMessage);
        }

        return { success: true, message: `${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} Sent`, data: message };
    } catch (error) {
        throw error;
    }
};

module.exports = exports;