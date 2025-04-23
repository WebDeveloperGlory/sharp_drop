const db = require('../config/db');

exports.userGetChatDetails = async ({ channelId }, { userId }) => {
    // Check if chatId is valid
    const foundChat = await db.Chat.findOne({ 
        channel: channelId,
        isActive: true
    });
    if( !foundChat ) return { success: false, message: 'Invalid/Inactive Chat' };

    // Check if user is in chat
    if( foundChat.user.toString() !== userId.toString() ) return { success: false, message: 'Not Authorized' };

    // Get chat details
    const chatDetails = await db.Chat.findById( chatId )
        .populate([
            {
                path: 'channel',
                select: 'name color',
            },
            {
                path: 'user',
                select: 'number email',
            },
            {
                path: 'lastMessage',
                select: 'sender content type createdAt',
                populate: {
                    path: 'sender',
                    select: 'number email',
                }
            },
            {
                path: 'messages',
                select: 'sender content media type createdAt',
                populate: {
                    path: 'sender',
                    select: 'number email',
                }
            }
        ]);

    // Return success
    return { success: true, message: 'Chat Details', data: chatDetails };
}

exports.adminGetAllChats = async () => {
    
}

exports.startChat = async ({ channelId }, { userId }) => {
    // Check if channelId is valid
    const foundChannel = await db.Channel.findById( channelId );
    if( !foundChannel ) return { success: false, message: 'Invalid Channel' };

    // Check if user is already in channel
    const existingChat = await db.Chat.findOne({
        channel: channelId,
        user: userId,
        isActive: true
    });
    if( existingChat ) return { success: true, message: 'Chat Already Started', data: existingChat };

    // Create new chat
    const newChat = new db.Chat({
        channel: channelId,
        user: userId,
        lastMessage: null,
        messages: [],
        unreadCount: 0,
        isActive: true,
        startedAt: Date.now()
    })
    await newChat.save();

    // Return success
    return { success: true, message: 'Chat Started', data: newChat };
}

exports.joinChat = async ({ chatId }, { userId }) => {
    // Check if chatId is valid
    const foundChat = await db.Chat.findOne({ 
        _id: chatId,
        isActive: true
    });
    if( !foundChat ) return { success: false, message: 'Invalid/Inactive Chat' };

    // Check if user is already in chat
    if( foundChat.admin.toString() === userId.toString() ) return { success: true, message: 'Already In Chat', data: foundChat };

    // Add user to chat
    foundChat.admin = userId;
    await foundChat.save();

    // Return success
    return { success: true, message: 'Admin Joined Chat', data: foundChat };
}

exports.setChatAsInactive = async ({ chatId }, { userId }) => {
    // Check if chatId is valid
    const foundChat = await db.Chat.findOne({ 
        _id: chatId,
        isActive: true
    });
    if( !foundChat ) return { success: false, message: 'Invalid/Inactive Chat' };

    // Set chat as inactive
    foundChat.isActive = false;
    foundChat.endedAt = Date.now();
    foundChat.endedBy = userId;
    await foundChat.save();

    // Return success
    return { success: true, message: 'Chat Set As Inactive', data: foundChat };
}