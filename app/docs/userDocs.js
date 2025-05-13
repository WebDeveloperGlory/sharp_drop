/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User profile and referral management
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
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         number:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['superAdmin', 'admin', 'user']
 *           default: 'user'
 *         referralCode:
 *           type: string
 *           nullable: true
 *         referredBy:
 *           type: string
 *           nullable: true
 *           description: ID of referring user
 *         isOnline:
 *           type: boolean
 *           default: false
 *         lastSeen:
 *           type: string
 *           format: date-time
 *         referralCount:
 *           type: integer
 *           description: Number of successful referrals
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         number: "+1234567890"
 *         role: "user"
 *         referralCode: "abc123xy"
 *         referredBy: null
 *         isOnline: false
 *         lastSeen: "2023-05-15T10:00:00Z"
 *         referralCount: 3
 *         createdAt: "2023-05-01T12:00:00Z"
 *         updatedAt: "2023-05-15T10:00:00Z"
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get user profile with referral count
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
 *         description: Unauthorized
 *       404:
 *         description: User not found
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
 */

/**
 * @swagger
 * /user/referrals/personal:
 *   get:
 *     tags: [User]
 *     summary: Get list of user's referrals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of referral emails retrieved
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
 *                   example: "All Referrals Acquired"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: email
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user/referrals/generate:
 *   post:
 *     tags: [User]
 *     summary: Generate unique referral code for user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Referral code generated successfully
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
 *                   example: "Referral Code Generated"
 *                 data:
 *                   type: string
 *                   example: "abc123xy"
 *       400:
 *         description: Bad request (code already exists)
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
 *                   example: "Referral Code Already Exists"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to generate unique code
 */

/**
 * @swagger
 * /user/referrals/validate/{referralCode}:
 *   post:
 *     tags: [User]
 *     summary: Validate a referral code
 *     parameters:
 *       - in: path
 *         name: referralCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The referral code to validate
 *     responses:
 *       200:
 *         description: Referral code is valid
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
 *                   example: "Valid Referral Code"
 *                 data:
 *                   type: string
 *                   format: email
 *                   description: Email of referring user
 *       400:
 *         description: Invalid referral code
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
 *                   example: "Invalid Referral Code"
 */

/**
 * @swagger
 * /user/profile/delete:
 *   delete:
 *     tags: [User]
 *     summary: Delete own user account
 *     description: Allows a user to permanently delete their own account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
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
 *                   example: "Account deleted successfully"
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
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
 *       500:
 *         description: Internal server error
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
 *                   example: "Error deleting account"
 */

/**
 * @swagger
 * /user/profile/delete/{userId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user account (Admin only)
 *     description: Allows admins to delete user accounts (requires admin permissions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: "User deleted successfully"
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized or insufficient permissions
 *       404:
 *         description: User not found
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
 *       500:
 *         description: Internal server error
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