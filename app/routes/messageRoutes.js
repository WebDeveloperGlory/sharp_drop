const { Router } = require('express');
const controller = require('../controllers/messageController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const upload = require('../middlewares/fileUpload');

const router = Router();

// GENERAL ROUTES //
router.post( '/text', authenticateUser, controller.sendTextMessage );
router.post( '/image', authenticateUser, upload.single('imageFile'), controller.sendImageMessage );
router.post( '/video', authenticateUser, controller.sendVideoMessage );
router.put( '/:chatId/read', authenticateUser, controller.markAsRead );
// END OF GENERAL ROUTES //

module.exports = router;