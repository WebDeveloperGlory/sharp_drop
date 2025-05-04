const db = require('../config/db');
const { verifyToken } = require('../utils/jwtUtils');

class SocketService {
    constructor(io) {
        this.io = io;
        this.initializeSocketEvents();
    }

    initializeSocketEvents() {
        this.io.use(async (socket, next) => {
            try {
                // Extract token from handshake or query
                const token = socket.handshake.auth.token || socket.handshake.query.token;
                
                if (!token) {
                    throw new Error('Authentication error: No token provided');
                }

                // Use your existing verifyToken function
                const decoded = verifyToken(token);
                
                if (!decoded) {
                    throw new Error('Invalid token');
                }

                // Attach user data to socket
                socket.user = {
                    userId: decoded.userId,
                    email: decoded.email,
                    role: decoded.role
                };
                
                next();
            } catch (error) {
                console.error('Socket authentication error:', error.message);
                next(new Error('Authentication failed'));
            }
        });

        this.io.on('connection', (socket) => {
            if (!socket.user) {
                console.log(`Unauthenticated connection attempt from ${socket.id}`);
                socket.disconnect(true);
                return;
            }

            console.log(`New client connected: ${socket.id} - User: ${socket.user.userId}`);

            // Join appropriate rooms based on user role
            this.joinUserRooms(socket);

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id} - User: ${socket.user.userId}`);
            });

            // Join a specific chat room
            socket.on('join_chat', async (chatId) => {
                try {
                    const isValidChat = await this.validateChatAccess(socket.user.userId, chatId);
                    if (!isValidChat) {
                        throw new Error('Unauthorized chat access');
                    }
                    socket.join(`chat:${chatId}`);
                    console.log(`${socket.user.userId} joined chat:${chatId}`);
                } catch (error) {
                    console.error('Error joining chat:', error.message);
                    socket.emit('error', { message: 'Failed to join chat' });
                }
            });

            // Leave a specific chat room
            socket.on('leave_chat', (chatId) => {
                socket.leave(`chat:${chatId}`);
                console.log(`${socket.user.userId} left chat:${chatId}`);
            });

            // Handle typing indicators
            socket.on('typing', (data) => {
                const { chatId, isTyping } = data;
                socket.to(`chat:${chatId}`).emit('user_typing', {
                    chatId,
                    userId: socket.user.userId,
                    isTyping
                });
            });
        });
    }

    async joinUserRooms(socket) {
        try {
            const { userId, role } = socket.user;

            // Join user's personal room
            socket.join(`user:${userId}`);

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
            console.log(`User ${userId} (${role}) connected and joined rooms`);
        } catch (error) {
            console.error('Room joining error:', error);
            socket.emit('error', { message: 'Failed to join rooms' });
        }
    }

    async validateChatAccess(userId, chatId) {
        try {
            const chat = await db.Chat.findOne({ _id: chatId });
            if (!chat) return false;
            
            // Check if user is participant or admin
            if (chat.user.toString() === userId) return true;
            
            // For group chats or other scenarios, add additional checks here
            return false;
        } catch (error) {
            console.error('Chat validation error:', error);
            return false;
        }
    }

    /* ====================== */
    /*  ORIGINAL EMIT METHODS */
    /* ====================== */

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

const initializeSocketService = (io) => {
    if (!socketService && io) {
        socketService = new SocketService(io);
    }
    return socketService;
};

module.exports = {
    initializeSocketService,
    getSocketService: () => socketService
};