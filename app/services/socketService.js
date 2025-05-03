const db = require('../config/db');

class SocketService {
    constructor( io ) {
        this.io = io;
        this.initializeSocketEvents();
    }

    initializeSocketEvents() {
        this.io.on('connection', (socket) => {
            console.log(`New client connected: ${ socket.id }`);
            
            // Authenticate socket connection
            socket.on('authenticate', async (data) => {
                try {
                    const { userId, role } = data;
                    
                    // Store user info in socket
                    socket.userId = userId;
                    socket.role = role;
                
                    // Join user's personal room
                    socket.join(`user:${userId}`);
                
                    // If admin, join admin room
                    if (role === 'admin' || role === 'superAdmin') {
                        socket.join('admins');
                        
                        // Get all active channels for admin
                        const channels = await db.Channel.find({});
                        channels.forEach(channel => {
                            socket.join(`channel:${channel._id}`);
                        });
                    } else {
                        // Regular user - join their active chat rooms
                        const userChats = await db.Chat.find({ user: userId, isActive: true });
                            userChats.forEach(chat => {
                            socket.join(`chat:${chat._id}`);
                        });
                    }
                
                    socket.emit('authenticated', { success: true });
                    console.log(`User ${userId} authenticated as ${role}`);
                } catch (error) {
                    console.error('Authentication error:', error);
                    socket.emit('error', { message: 'Authentication failed' });
                }
            });
        
            // Join a specific chat room
            socket.on('join_chat', async (chatId) => {
                try {
                    socket.join(`chat:${chatId}`);
                    console.log(`${socket.id} joined chat:${chatId}`);
                } catch (error) {
                    console.error('Error joining chat:', error);
                }
            });
        
            // Leave a specific chat room
            socket.on('leave_chat', (chatId) => {
                socket.leave(`chat:${chatId}`);
                console.log(`${socket.id} left chat:${chatId}`);
            });
        
            // Handle typing indicators
            socket.on('typing', (data) => {
                const { chatId, isTyping } = data;
                socket.to(`chat:${chatId}`).emit('user_typing', {
                    chatId,
                    userId: socket.userId,
                    isTyping
                });
            });
        
            // Handle disconnection
            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }
    
    // Methods to be used by other services
  
    // Emit new message to a chat room
    emitNewMessage(chatId, message) {
        this.io.to(`chat:${chatId}`).emit('new_message', message);
        
        // Also notify admin channel if this chat belongs to a channel
        if (message.chat && message.chat.channel) {
            this.io.to(`channel:${message.chat.channel}`).emit('channel_new_message', {
                chatId,
                message
            });
        }
    }
    
    // Emit read status to a chat room
    emitMessagesRead(chatId, userId) {
        this.io.to(`chat:${chatId}`).emit('messages_read', { chatId, userId });
    }
  
    // Notify user of new chat (e.g., when admin creates a chat)
    notifyUserNewChat(userId, chat) {
        this.io.to(`user:${userId}`).emit('new_chat', chat);
    }
    
    // Notify all admins of new chat
    notifyAdminsNewChat(chat) {
        this.io.to('admins').emit('new_admin_chat', chat);
    }
}

let socketService;

// Factory function to create or get socket service
const initializeSocketService = ( io ) => {
    if (!socketService && io) {
        socketService = new SocketService( io );
    }
    return socketService;
};

module.exports = {
    initializeSocketService,
    getSocketService: () => socketService
};