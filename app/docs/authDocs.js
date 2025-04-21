/**
 * @swagger
 * tags:
 *   - name: Authentication (Public)
 *     description: Public authentication endpoints for all users
 *   - name: Authentication (General)
 *     description: General authentication and account management endpoints
 *   - name: Authentication (Admin)
 *     description: Admin authentication and account management endpoints
 */

// ==================== AUTHENTICATION OPERATIONS ==================== //

/**
 * @swagger
 * /auth/register/user:
 *   post:
 *     tags: [Authentication (Public)]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - number
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   example: "User Registered"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     number:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Bad request (missing fields or user exists)
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
 *                   example: "Missing Required Fields"
 */

/**
 * @swagger
 * /auth/login/user:
 *   post:
 *     tags: [Authentication (Public)]
 *     summary: Login as a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                   example: "User Logged In"
 *                 data:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid credentials
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
 *                   example: "Invalid Email/Number"
 */

/**
 * @swagger
 * /auth/register/security:
 *   post:
 *     tags: [Authentication (General)]
 *     summary: Set security pin for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - securityPin
 *               - userId
 *             properties:
 *               securityPin:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *                 description: 6-digit security pin
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Security pin set successfully
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
 *                   example: "Security Pin Set"
 *                 data:
 *                   type: string
 *                   description: The security pin that was set
 *       400:
 *         description: Invalid request (invalid pin length or user)
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
 *                   example: "Security Pin Must Be 6 Digits Long"
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Authentication (General)]
 *     summary: Logout a user
 *     description: Logs out the authenticated user by setting their online status to false and updating last seen timestamp
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
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
 *                   example: "User Logged Out"
 *                 data:
 *                   type: null
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

/**
 * @swagger
 * /auth/register/admin:
 *   post:
 *     tags: [Authentication (Admin)]
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - number
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Admin registered successfully
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
 *                   example: "Admin Registered"
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     number:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Bad request (missing fields or user exists)
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
 *                   example: "User With Email Already Exists"
 */

/**
 * @swagger
 * /auth/register/super:
 *   post:
 *     tags: [Authentication (Admin)]
 *     summary: Register a new super admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - number
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Super admin registered successfully
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
 *                   example: "Super Admin Registered"
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     number:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: "superAdmin"
 *       400:
 *         description: Bad request (missing fields or user exists)
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
 *                   example: "User With Email Already Exists"
 */

/**
 * @swagger
 * /auth/login/admin:
 *   post:
 *     tags: [Authentication (Admin)]
 *     summary: Login as an admin or super admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               number:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Admin logged in successfully
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
 *                   example: "Admin Logged In"
 *                 data:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid credentials
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
 *                   example: "Invalid Email/Number"
 */