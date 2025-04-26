const { Router } = require('express');
const controller = require('../controllers/messageController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

// GENERAL ROUTES //
router.post( '/text', authenticateUser, controller.sendTextMessage );
router.post( '/image', authenticateUser, controller.sendImageMessage );
router.post( '/video', authenticateUser, controller.sendVideoMessage );
router.post( '/:chatId/read', authenticateUser, controller.markAsRead );
// END OF GENERAL ROUTES //

module.exports = router;