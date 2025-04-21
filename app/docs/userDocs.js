/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User profile management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         number:
 *           type: string
 *           description: User's phone number
 *         role:
 *           type: string
 *           enum: ['superAdmin', 'admin', 'user']
 *           default: 'user'
 *           description: User's role in the system
 *         isOnline:
 *           type: boolean
 *           default: false
 *           description: Whether the user is currently online
 *         lastSeen:
 *           type: string
 *           format: date-time
 *           description: Last active timestamp
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update timestamp
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         number: "+1234567890"
 *         role: "user"
 *         isOnline: false
 *         lastSeen: "2023-05-15T10:00:00Z"
 *         createdAt: "2023-05-01T12:00:00Z"
 *         updatedAt: "2023-05-15T10:00:00Z"
 */

/**
 * @swagger
 * /user/profile:
 *   post:
 *     tags: [User]
 *     summary: Get user profile
 *     description: Retrieve authenticated user's profile details (excluding sensitive information like password and security pin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *                   example: "User Details Acquired"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       400:
 *         description: Bad request (invalid user)
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
 *                   example: "Invalid User"
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */