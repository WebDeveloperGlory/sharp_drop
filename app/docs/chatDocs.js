/**
 * @swagger
 * tags:
 *   - name: Chat (User)
 *     description: User chat operations
 *   - name: Chat (Admin)
 *     description: Admin chat management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Chat ID
 *         channel:
 *           $ref: '#/components/schemas/Channel'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         admin:
 *           $ref: '#/components/schemas/User'
 *         lastMessage:
 *           $ref: '#/components/schemas/Message'
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *         unreadCount:
 *           type: number
 *           default: 0
 *         isActive:
 *           type: boolean
 *           default: true
 *         startedAt:
 *           type: string
 *           format: date-time
 *         endedAt:
 *           type: string
 *           format: date-time
 *         endedBy:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         chat:
 *           $ref: '#/components/schemas/Chat'
 *         sender:
 *           $ref: '#/components/schemas/User'
 *         content:
 *           type: string
 *         media:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *             type:
 *               type: string
 *               enum: ['image', 'video', null]
 *             thumbnail:
 *               type: string
 *             duration:
 *               type: number
 *             size:
 *               type: number
 *         type:
 *           type: string
 *           enum: ['text', 'image', 'video']
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Channel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         color:
 *           type: string
 */

/**
 * @swagger
 * /chat/user:
 *   post:
 *     tags: [Chat (User)]
 *     summary: Get chat details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Channel ID
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
 *                   example: "Chat Details"
 *                 data:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Invalid/Inactive chat or not authorized
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /chat/user/start:
 *   post:
 *     tags: [Chat (User)]
 *     summary: Start a new chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Channel ID
 *     responses:
 *       201:
 *         description: Chat started or already exists
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
 *                   example: "Chat Started"
 *                 data:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Invalid channel
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /chat/admin:
 *   post:
 *     tags: [Chat (Admin)]
 *     summary: Get all chats (Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All chats retrieved
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
 *                   example: "All Chats"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Unauthorized or insufficient permissions
 */

/**
 * @swagger
 * /chat/admin/join:
 *   post:
 *     tags: [Chat (Admin)]
 *     summary: Admin join chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Admin joined chat or already in chat
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
 *                   example: "Admin Joined Chat"
 *                 data:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Invalid/Inactive chat
 *       401:
 *         description: Unauthorized or insufficient permissions
 */

/**
 * @swagger
 * /chat/admin/leave:
 *   post:
 *     tags: [Chat (Admin)]
 *     summary: Admin leave chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Admin left chat
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
 *                   example: "Admin Left Chat"
 *                 data:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Invalid/Inactive chat or not authorized
 *       401:
 *         description: Unauthorized or insufficient permissions
 */

/**
 * @swagger
 * /chat/admin/messages:
 *   post:
 *     tags: [Chat (Admin)]
 *     summary: Get chat messages (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat messages retrieved
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
 *                   example: "Chat Messages"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid/Inactive chat
 *       401:
 *         description: Unauthorized or insufficient permissions
 */

/**
 * @swagger
 * /chat/admin/inactive:
 *   post:
 *     tags: [Chat (Admin)]
 *     summary: Set chat as inactive (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat set as inactive
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
 *                   example: "Chat Set As Inactive"
 *                 data:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Invalid/Inactive chat
 *       401:
 *         description: Unauthorized or insufficient permissions
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