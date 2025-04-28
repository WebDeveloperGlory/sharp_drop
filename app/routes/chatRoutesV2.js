const { Router } = require('express');
const controller = require('../controllers/chatControllerV2');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

// USER ROUTES //
router.get( '/user/chat', authenticateUser, controller.userListActiveChats );
router.get( '/user/chat/:chatId', authenticateUser, controller.userActiveChatClick );
router.get( '/user/channel/:channelId', authenticateUser, controller.userChannelClick );
// END OF USER ROUTES //

// ADMIN ROUTES //
router.get( '/admin/channel/:channelId', authenticateUser, hasAdminPermissions, controller.adminChannelClick );
router.get( '/admin/chat/:chatId', authenticateUser, hasAdminPermissions, controller.adminChatClick );
// END OF ADMIN ROUTES //

module.exports = router;