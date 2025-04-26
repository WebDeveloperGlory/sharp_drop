/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: Message sending and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Message ID
 *         chat:
 *           type: string
 *           description: Chat ID reference
 *         sender:
 *           type: string
 *           description: User ID of sender
 *         content:
 *           type: string
 *           description: Text content (for text messages)
 *         media:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               format: uri
 *             type:
 *               type: string
 *               enum: ['image', 'video']
 *             thumbnail:
 *               type: string
 *               format: uri
 *               description: URL of thumbnail (for videos)
 *             duration:
 *               type: number
 *               description: Duration in seconds (for videos)
 *             size:
 *               type: number
 *               description: File size in bytes
 *             width:
 *               type: number
 *             height:
 *               type: number
 *         type:
 *           type: string
 *           enum: ['text', 'image', 'video']
 *           default: 'text'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     TextMessageRequest:
 *       type: object
 *       required:
 *         - chatId
 *         - content
 *       properties:
 *         chatId:
 *           type: string
 *           description: ID of the chat
 *         content:
 *           type: string
 *           description: Text content of message
 * 
 *     MediaMessageRequest:
 *       type: object
 *       required:
 *         - chatId
 *       properties:
 *         chatId:
 *           type: string
 *           description: ID of the chat
 * 
 *     MarkAsReadRequest:
 *       type: object
 *       required:
 *         - chatId
 *       properties:
 *         chatId:
 *           type: string
 *           description: ID of the chat to mark as read
 */

/**
 * @swagger
 * /message/text:
 *   post:
 *     tags: [Messages]
 *     summary: Send text message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/TextMessageRequest'
 *     responses:
 *       201:
 *         description: Text message sent successfully
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
 *                   example: "Message Sent"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /message/image:
 *   post:
 *     tags: [Messages]
 *     summary: Send image message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image message sent successfully
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
 *                   example: "Image Sent"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid request or file
 *       401:
 *         description: Unauthorized
 *       413:
 *         description: File too large
 */

/**
 * @swagger
 * /message/video:
 *   post:
 *     tags: [Messages]
 *     summary: Send video message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Video message sent successfully
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
 *                   example: "Video Sent"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid request or file
 *       401:
 *         description: Unauthorized
 *       413:
 *         description: File too large
 */

/**
 * @swagger
 * /message/{chatId}/read:
 *   put:
 *     tags: [Messages]
 *     summary: Mark chat messages as read
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to mark as read
 *     responses:
 *       200:
 *         description: Messages marked as read
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
 *                   example: "Chat Marked As Read"
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
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