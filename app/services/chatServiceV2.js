const db = require('../config/db');
const { getSocketService } = require('./socketService');

exports.userListActiveChats = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Get all chats
    const allChats = await db.Chat.find({ user: userId, isActive: true })
        .populate([
            {
                path: 'channel',
                select: 'name color'
            },
            {
                path: 'user',
                select: 'firstName lastName email'
            },
            {
                path: 'lastMessage',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'firstName lastName email'
                }
            }
        ]);

    // Return success
    return { success: true, message: 'All User Chats Acquired', data : allChats }
}

exports.userActiveChatClick = async ({ chatId }, { userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if chat exists
    const foundChat = await db.Chat.findOne({ _id: chatId, user: userId })
        .populate([
            {
                path: 'channel',
                select: 'name color'
            },
            {
                path: 'user',
                select: 'firstName lastName email'
            },
            {
                path: 'messages',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'firstName lastName email'
                }
            }
        ]);
    if( !foundChat ) return { success: false, message: 'Invalid Chat/User Permissions' };

    // Mark as read for admin
    await db.Chat.findByIdAndUpdate(
        chatId,
        { userUnreadCount: 0 }
    )

    // Emit via Socket.IO that user has read messages
    const socketService = getSocketService();
    if (socketService) {
        socketService.emitMessagesRead(chatId, userId);
    }

    // Return success
    return { success: true, message: 'Chat Acquired', data: foundChat };
}

exports.userChannelClick = async ({ channelId }, { userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Check if channel exists
    const foundChannel = await db.Channel.findById( channelId );
    if( !foundChannel ) return { success: false, message: 'Invalid Channel' };
    
    // Check if user has an existing chat for the channel
    let chat;
    const existingChat = await db.Chat.findOne({ channel: channelId, user: userId })
        .populate([
            {
                path: 'channel',
                select: 'name color'
            },
            {
                path: 'user',
                select: 'firstName lastName email'
            },
            {
                path: 'messages',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'firstName lastName email'
                }
            }
        ]);
    if( !existingChat ) {
        chat = new db.Chat({
            channel: channelId,
            user: userId,
            isActive: true
        })
        await chat.save();
    } else {
        chat = existingChat;
    }

    // Mark as read for admin
    await db.Chat.findOneAndUpdate(
        { channel: channelId, user: userId },
        { userUnreadCount: 0 }
    )

    // Return success
    return { success: true, message: 'Channel Chat Acquired', data: chat };
}

exports.adminChannelClick = async ({ channelId }) => {
    // Check if channel exists
    const foundChannel = await db.Channel.findById( channelId );
    if( !foundChannel ) return { success: false, message: 'Invalid Channel' };

    // Get all chats under the channel
    const allChats = await db.Chat.find({ channel: channelId })
        .populate([
            {
                path: 'lastMessage',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'firstName lastName email'
                }
            },
            {
                path: 'messages',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'firstName lastName email'
                }
            },
            {
                path: 'user',
                select: 'firstName lastName email'
            },
        ]);

    // Return success
    return { success: true, message: 'All Channel Chats Acquired', data: allChats };
}

exports.adminChatClick = async ({ chatId }) => {
    // Check if chat exists
    const foundChat = await db.Chat.findOne({ _id: chatId })
        .populate([
            {
                path: 'channel',
                select: 'name color'
            },
            {
                path: 'user',
                select: 'firstName lastName email'
            },
            {
                path: 'messages',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'firstName lastName email'
                }
            }
        ]);
    if( !foundChat ) return { success: false, message: 'Invalid Chat' };

    // Mark as read for admin
    await db.Chat.findByIdAndUpdate(
        chatId,
        { adminUnreadCount: 0 }
    )

    // Emit via Socket.IO that admin has read messages
    const socketService = getSocketService();
    if (socketService) {
        socketService.emitMessagesRead(chatId, 'admin');
    }

    // Return success
    return { success: true, message: 'Chat Acquired', data: foundChat };
}

module.exports = exports;