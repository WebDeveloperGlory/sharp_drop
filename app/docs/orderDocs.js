/**
 * @swagger
 * tags:
 *   - name: Orders (User)
 *     description: User order operations
 *   - name: Orders (Admin)
 *     description: Admin order management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Order ID
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *         admin:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *         tradeName:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: double
 *         quantity:
 *           type: number
 *         tradeType:
 *           type: string
 *           enum: ['sale', 'purchase']
 *         confirmed:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - tradeName
 *         - description
 *         - price
 *         - quantity
 *         - tradeType
 *         - targetUser
 *       properties:
 *         tradeName:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         tradeType:
 *           type: string
 *           enum: ['sale', 'purchase']
 *         targetUser:
 *           type: string
 * 
 *     ConfirmOrderRequest:
 *       type: object
 *       required:
 *         - securityPin
 *       properties:
 *         securityPin:
 *           type: string
 *           minLength: 6
 *           maxLength: 6
 *           description: 6-digit security pin
 */

/**
 * @swagger
 * /order/user:
 *   get:
 *     tags: [Orders (User)]
 *     summary: Get all orders for current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders retrieved
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
 *                   example: "User Orders Acquired"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /order/user/{orderId}:
 *   put:
 *     tags: [Orders (User)]
 *     summary: Confirm an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to confirm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmOrderRequest'
 *     responses:
 *       200:
 *         description: Order confirmed successfully
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
 *                   example: "Order Confirmed"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid security pin or order
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /order/admin:
 *   get:
 *     tags: [Orders (Admin)]
 *     summary: Get all orders (Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders retrieved
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
 *                   example: "All Orders Acquired"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized or insufficient permissions
 */

/**
 * @swagger
 * /order/admin:
 *   post:
 *     tags: [Orders (Admin)]
 *     summary: Create new order (Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                   example: "Order Created"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request or target user
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