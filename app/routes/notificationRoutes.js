const { Router } = require('express');
const controller = require('../controllers/notificationController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = Router();

// USER ROUTES //
// END OF USER ROUTES //

// GENERAL ROUTES //
router.get( '/', authenticateUser, controller.retrieveAllNotifications );
router.put( '/', authenticateUser, controller.markAllNotificationsAsRead );
router.put( '/:notificationId/read', authenticateUser, controller.markNotificationAsRead );
// END OF GENERAL ROUTES //

// ADMIN ROUTES //
// END OF ADMIN ROUTES //

module.exports = router;