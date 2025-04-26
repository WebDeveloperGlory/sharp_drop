const { Router } = require('express');
const controller = require('../controllers/chatController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

// USER ROUTES //
router.post( '/user', authenticateUser, controller.userGetChatDetails );
router.post( '/user/start', authenticateUser, controller.startChat );
// END OF USER ROUTES //

// ADMIN ROUTES //
router.post( '/admin', authenticateUser, hasAdminPermissions, controller.adminGetAllChats );
router.post( '/admin/join', authenticateUser, hasAdminPermissions, controller.adminJoinChat );
router.post( '/admin/leave', authenticateUser, hasAdminPermissions, controller.adminLeaveChat );
router.post( '/admin/messages', authenticateUser, hasAdminPermissions, controller.adminGetChatMessages );
router.post( '/admin/inactive', authenticateUser, hasAdminPermissions, controller.setChatAsInactive );
// END OF ADMIN ROUTES //

module.exports = router;