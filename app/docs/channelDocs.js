/**
 * @swagger
 * tags:
 *   - name: Channels (Public)
 *     description: Public channel endpoints
 *   - name: Channels (Admin)
 *     description: Admin channel management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Channel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the channel
 *         name:
 *           type: string
 *           description: Unique name of the channel
 *         color:
 *           type: string
 *           description: Unique color code for the channel
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the channel
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the channel is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Channel creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Channel last update timestamp
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         name: "general"
 *         color: "#FF0000"
 *         createdBy: "507f1f77bcf86cd799439012"
 *         isActive: true
 *         createdAt: "2023-05-01T12:00:00Z"
 *         updatedAt: "2023-05-01T12:00:00Z"
 *     CreateChannelRequest:
 *       type: object
 *       required:
 *         - name
 *         - color
 *       properties:
 *         name:
 *           type: string
 *           example: "general"
 *         color:
 *           type: string
 *           example: "#FF0000"
 */

/**
 * @swagger
 * /channel:
 *   get:
 *     tags: [Channels (Public)]
 *     summary: Get all active channels
 *     description: Retrieve a list of all active channels
 *     responses:
 *       200:
 *         description: List of active channels retrieved successfully
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
 *                   example: "All Active Channels Acquired"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Channel'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /channel:
 *   post:
 *     tags: [Channels (Admin)]
 *     summary: Create a new channel (Super Admin only)
 *     description: Create a new channel with unique name and color (requires super admin permissions)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChannelRequest'
 *     responses:
 *       201:
 *         description: Channel created successfully
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
 *                   example: "Channel Created"
 *                 data:
 *                   $ref: '#/components/schemas/Channel'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "99"
 *                 message:
 *                   type: string
 *                   example: "Channel With Same Name Exists"
 *       401:
 *         description: Unauthorized (invalid or missing token, or insufficient permissions)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "99"
 *                 message:
 *                   type: string
 *                   example: "Invalid User Permissions"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */