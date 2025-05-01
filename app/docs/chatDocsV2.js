/**
 * @swagger
 * tags:
 *   - name: Chat V2 (User)
 *     description: Version 2 user chat operations
 *   - name: Chat V2 (Admin)
 *     description: Version 2 admin chat management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatV2:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         channel:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             color:
 *               type: string
 *         user:
 *           type: string
 *         lastMessage:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             sender:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *             content:
 *               type: string
 *             media:
 *               type: object
 *             type:
 *               type: string
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *         unreadCount:
 *           type: number
 *         userUnreadCount:
 *           type: number
 *         adminUnreadCount:
 *           type: number
 *         isActive:
 *           type: boolean
 *         startedAt:
 *           type: string
 *           format: date-time
 *         endedAt:
 *           type: string
 *           format: date-time
 *         endedBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /chat/v2/user/chat:
 *   get:
 *     tags: [Chat V2 (User)]
 *     summary: List all active chats for user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active chats retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "All User Chats Acquired"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ChatV2'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /chat/v2/user/chat/{chatId}:
 *   get:
 *     tags: [Chat V2 (User)]
 *     summary: Get specific chat details (marks as read for user)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to retrieve
 *     responses:
 *       200:
 *         description: Chat details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "Chat Acquired"
 *                 data:
 *                   $ref: '#/components/schemas/ChatV2'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User doesn't have permission to access this chat
 *       404:
 *         description: Chat not found
 */

/**
 * @swagger
 * /chat/v2/user/channel/{channelId}:
 *   get:
 *     tags: [Chat V2 (User)]
 *     summary: Get or create chat for specific channel (marks as read for user)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the channel
 *     responses:
 *       200:
 *         description: Channel chat retrieved/created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "Channel Chat Acquired"
 *                 data:
 *                   $ref: '#/components/schemas/ChatV2'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Channel not found
 */

/**
 * @swagger
 * /chat/v2/admin/channel/{channelId}:
 *   get:
 *     tags: [Chat V2 (Admin)]
 *     summary: Get all chats for a channel (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the channel
 *     responses:
 *       200:
 *         description: List of channel chats retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "All Channel Chats Acquired"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ChatV2'
 *       401:
 *         description: Unauthorized or insufficient permissions
 *       404:
 *         description: Channel not found
 */

/**
 * @swagger
 * /chat/v2/admin/chat/{chatId}:
 *   get:
 *     tags: [Chat V2 (Admin)]
 *     summary: Get specific chat details (marks as read for admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to retrieve
 *     responses:
 *       200:
 *         description: Chat details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "Chat Acquired"
 *                 data:
 *                   $ref: '#/components/schemas/ChatV2'
 *       401:
 *         description: Unauthorized or insufficient permissions
 *       404:
 *         description: Chat not found
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */